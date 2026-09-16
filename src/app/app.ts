import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedStateService } from '@nexus-dashboard/ui';

interface NavItem {
  label: string;
  path: string;
  exact: boolean;
}


@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'nexus-dashboard';
  protected sharedState = inject(SharedStateService);

  protected navItems: NavItem[] = [
    { label: 'Dashboard', path: '/', exact: true },
    { label: 'Analytics', path: '/analytics', exact: false },
    { label: 'Team', path: '/team', exact: false },
    { label: 'Settings', path: '/settings', exact: false },
  ];

  onOrgChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sharedState.setActiveOrg(value);
  }
}