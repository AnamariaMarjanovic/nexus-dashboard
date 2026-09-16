import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button, Card, SharedStateService } from '@nexus-dashboard/ui';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [FormsModule, Card, Button],
    template: `
    <h1 class="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
    <p class="text-gray-500 mb-8">Manage your profile, preferences and organization.</p>

    <div class="grid grid-cols-2 gap-6 max-w-3xl">
      <ui-card label="Profile">
        <div class="space-y-3">
          <div>
            <label class="text-xs text-gray-500 block mb-1">Full name</label>
            <input
              type="text"
              [(ngModel)]="fullName"
              class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="text-xs text-gray-500 block mb-1">Email</label>
            <input
              type="email"
              [(ngModel)]="email"
              class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="text-xs text-gray-500 block mb-1">Role</label>
            <input
              type="text"
              value="Frontend Lead"
              disabled
              class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50 text-gray-400"
            />
          </div>
        </div>
      </ui-card>

      <ui-card label="Preferences">
        <div class="space-y-4">
          <label class="flex items-center justify-between cursor-pointer">
            <span class="text-sm text-gray-700">Email notifications</span>
            <input type="checkbox" [(ngModel)]="emailNotifications" class="w-4 h-4 accent-indigo-600" />
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <span class="text-sm text-gray-700">Weekly summary report</span>
            <input type="checkbox" [(ngModel)]="weeklySummary" class="w-4 h-4 accent-indigo-600" />
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <span class="text-sm text-gray-700">Compact sidebar</span>
            <input type="checkbox" [(ngModel)]="compactSidebar" class="w-4 h-4 accent-indigo-600" />
          </label>
        </div>
      </ui-card>

      <ui-card label="Current organization">
        <p class="text-lg font-semibold text-gray-800">{{ sharedState.activeOrg() }}</p>
        <p class="text-sm text-gray-500 mt-1">Switch organizations from the sidebar. All modules stay in sync automatically.</p>
      </ui-card>

      <ui-card label="Danger zone">
        <p class="text-sm text-gray-500 mb-3">This is a demo project — no data is actually deleted.</p>
        <ui-button variant="danger">Remove organization access</ui-button>
      </ui-card>
    </div>

    @if (saved) {
      <p class="text-sm text-green-600 mt-6">Preferences saved.</p>
    }

    <ui-button (click)="save()">Save changes</ui-button>
  `,
})
export class SettingsComponent {
    protected sharedState = inject(SharedStateService);

    fullName = 'Anamaria Oršulić';
    email = 'anamaria.orsulic@outlook.com';
    emailNotifications = true;
    weeklySummary = false;
    compactSidebar = false;
    saved = false;

    save() {
        this.saved = true;
        setTimeout(() => (this.saved = false), 2000);
    }
}