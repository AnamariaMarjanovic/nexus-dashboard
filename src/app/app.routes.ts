import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';

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
      // @ts-expect-error - dynamic runtime import, no local type declarations
      const RefreshRuntime = await import(/* @vite-ignore */ 'http://localhost:4202/@react-refresh');
      RefreshRuntime.injectIntoGlobalHook(window);
      (window as any).$RefreshReg$ = () => { };
      (window as any).$RefreshSig$ = () => (type: unknown) => type;
      (window as any).__vite_plugin_react_preamble_installed__ = true;

      // @ts-expect-error - dynamic runtime import of remote web component, no local type declarations
      await import(/* @vite-ignore */ 'http://localhost:4202/src/web-component.tsx');

      const { TeamWrapper } = await import('./team-wrapper');
      return TeamWrapper;
    }
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings.component').then(m => m.SettingsComponent),
  },
];