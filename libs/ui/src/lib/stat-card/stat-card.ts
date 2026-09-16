import { Component, input } from '@angular/core';

@Component({
    selector: 'ui-stat-card',
    standalone: true,
    template: `
    <div class="bg-white rounded-xl shadow-sm p-6">
      <p class="text-sm text-gray-500 mb-1">{{ label() }}</p>
      <div class="flex items-baseline gap-2">
        <p class="text-2xl font-bold text-gray-800">{{ value() }}</p>
        @if (trend()) {
          <span
            class="text-xs font-medium"
            [class]="trend()!.startsWith('-') ? 'text-red-600' : 'text-green-600'"
          >{{ trend() }}</span>
        }
      </div>
    </div>
  `,
})
export class StatCard {
    label = input.required<string>();
    value = input.required<string>();
    trend = input<string>();
}