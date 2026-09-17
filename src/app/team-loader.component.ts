import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { ErrorState, Spinner } from '@nexus-dashboard/ui';

const isProd = location.hostname !== 'localhost';
const teamOrigin = isProd ? 'https://nexus-team-eosin.vercel.app' : 'http://localhost:4202';

@Component({
    selector: 'app-team-loader',
    standalone: true,
    imports: [Spinner, ErrorState],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    template: `
    @switch (status()) {
      @case ('loading') {
        <div class="flex items-center justify-center h-64">
          <ui-spinner />
        </div>
      }
      @case ('error') {
        <ui-error-state message="Couldn't load the Team module." (retry)="load()" />
      }
      @case ('ready') {
        <team-app></team-app>
      }
    }
  `,
})
export class TeamLoaderComponent {
    status = signal<'loading' | 'error' | 'ready'>('loading');

    constructor() {
        this.load();
    }

    async load() {
        this.status.set('loading');
        try {
            if (!isProd) {
                const RefreshRuntime = await import(/* @vite-ignore */ `${teamOrigin}/@react-refresh`);
                RefreshRuntime.injectIntoGlobalHook(window);
                (window as any).$RefreshReg$ = () => { };
                (window as any).$RefreshSig$ = () => (type: unknown) => type;
                (window as any).__vite_plugin_react_preamble_installed__ = true;
                await import(/* @vite-ignore */ `${teamOrigin}/src/web-component.tsx`);
            } else {
                await import(/* @vite-ignore */ `${teamOrigin}/team-component.js`);
            }
            this.status.set('ready');
        } catch (err) {
            console.error('Failed to load Team remote', err);
            this.status.set('error');
        }
    }
}