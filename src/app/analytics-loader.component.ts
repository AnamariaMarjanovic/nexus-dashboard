import { NgComponentOutlet } from '@angular/common';
import { Component, Type, signal } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { ErrorState, Spinner } from '@nexus-dashboard/ui';

@Component({
    selector: 'app-analytics-loader',
    standalone: true,
    imports: [NgComponentOutlet, Spinner, ErrorState],
    template: `
    @switch (status()) {
      @case ('loading') {
        <div class="flex items-center justify-center h-64">
          <ui-spinner />
        </div>
      }
      @case ('error') {
        <ui-error-state message="Couldn't load the Analytics module." (retry)="load()" />
      }
      @case ('ready') {
        <ng-container *ngComponentOutlet="component()!"></ng-container>
      }
    }
  `,
})
export class AnalyticsLoaderComponent {
    status = signal<'loading' | 'error' | 'ready'>('loading');
    component = signal<Type<unknown> | null>(null);

    constructor() {
        this.load();
    }

    load() {
        this.status.set('loading');
        loadRemoteModule('analytics', './Component')
            .then((m) => {
                this.component.set(m.App);
                this.status.set('ready');
            })
            .catch((err) => {
                console.error('Failed to load Analytics remote', err);
                this.status.set('error');
            });
    }
}