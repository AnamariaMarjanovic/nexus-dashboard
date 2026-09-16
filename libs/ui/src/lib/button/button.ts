import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'ui-button',
    standalone: true,
    template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      class="text-sm font-medium rounded-md px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      [class]="classes()"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class Button {
    variant = input<'primary' | 'secondary' | 'danger'>('primary');
    type = input<'button' | 'submit'>('button');
    disabled = input(false);

    classes = computed(() => {
        switch (this.variant()) {
            case 'secondary':
                return 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50';
            case 'danger':
                return 'text-red-600 border border-red-200 hover:bg-red-50';
            default:
                return 'bg-indigo-600 text-white hover:bg-indigo-700';
        }
    });
}