import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'analytics',
        loadComponent: () => loadRemoteModule('analytics', './Component').then(m => m.App)
    }
];
