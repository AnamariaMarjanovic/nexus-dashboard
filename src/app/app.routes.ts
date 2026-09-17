import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'analytics',
    loadComponent: () => import('./analytics-loader.component').then(m => m.AnalyticsLoaderComponent),
  },
  {
    path: 'team',
    loadComponent: () => import('./team-loader.component').then(m => m.TeamLoaderComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings.component').then(m => m.SettingsComponent),
  },
];