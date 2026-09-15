import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';

const isProd = location.hostname !== 'localhost';
const teamOrigin = isProd
  ? 'https://nexus-team-eosin.vercel.app'
  : 'http://localhost:4202';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'analytics',
    loadComponent: () => loadRemoteModule('analytics', './Component').then(m => m.App)
  },
  {
    path: 'team',
    loadComponent: async () => {
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

      const { TeamWrapper } = await import('./team-wrapper');
      return TeamWrapper;
    }
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings.component').then(m => m.SettingsComponent),
  },
];