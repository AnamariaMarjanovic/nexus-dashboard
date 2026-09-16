import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'ui-badge',
    standalone: true,
    template: `
    <span
      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
      [class]="classes()"
    >{{ text() }}</span>
  `,
})
export class Badge {
    text = input.required<string>();
    tone = input<'success' | 'warning' | 'danger' | 'neutral'>('neutral');

    classes = computed(() => {
        switch (this.tone()) {
            case 'success': return 'bg-green-100 text-green-700';
            case 'warning': return 'bg-amber-100 text-amber-700';
            case 'danger': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    });
}