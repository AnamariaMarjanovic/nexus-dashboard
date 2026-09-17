import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge, Card, SharedStateService, StatCard } from '@nexus-dashboard/ui';

interface ActivityItem {
  text: string;
  time: string;
  status: string;
  tone: 'success' | 'warning' | 'neutral';
}

interface QuickLink {
  label: string;
  description: string;
  path: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, Card, StatCard, Badge],
  template: `
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
    <p class="text-gray-500 mb-8">Welcome back — here's what's happening at {{ sharedState.activeOrg() }}.</p>

    <div class="grid grid-cols-3 gap-6 mb-8">
      <ui-stat-card label="Active Users" value="2,481" trend="+4.2%"></ui-stat-card>
      <ui-stat-card label="Revenue" value="€18,240" trend="+12.1%"></ui-stat-card>
      <ui-stat-card label="Open Tasks" value="7" trend="-2"></ui-stat-card>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2">
        <ui-card label="Recent activity">
          <div class="divide-y divide-gray-100 -mx-6 -mb-6">
            @for (item of activity; track item.text) {
              <div class="flex items-center justify-between px-6 py-3">
                <div>
                  <p class="text-sm text-gray-800">{{ item.text }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ item.time }}</p>
                </div>
                <ui-badge [text]="item.status" [tone]="item.tone"></ui-badge>
              </div>
            }
          </div>
        </ui-card>
      </div>

      <div class="space-y-4">
        @for (link of quickLinks; track link.path) {
          
        <a
            [routerLink]="link.path"
            class="block bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow no-underline"
          >
            <p class="text-sm font-semibold text-gray-800">{{ link.label }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ link.description }}</p>
          </a>
        }
      </div>
    </div>
  </div>
`,
})

export class DashboardComponent {
  protected sharedState = inject(SharedStateService);

  activity: ActivityItem[] = [
    { text: 'Revenue report generated for May', time: '2h ago', status: 'Completed', tone: 'success' },
    { text: 'New team member invited: Luka Kovač', time: '5h ago', status: 'Pending', tone: 'neutral' },
    { text: 'Conversion rate dropped below target', time: '1d ago', status: 'Needs review', tone: 'warning' },
    { text: 'Monthly analytics sync completed', time: '2d ago', status: 'Completed', tone: 'success' },
  ];

  quickLinks: QuickLink[] = [
    { label: 'Analytics', description: 'Revenue, users and conversion metrics', path: '/analytics' },
    { label: 'Team', description: 'People working on this project', path: '/team' },
    { label: 'Settings', description: 'Profile, preferences and organization', path: '/settings' },
  ];
}