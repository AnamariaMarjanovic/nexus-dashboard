import { Component, input } from '@angular/core';

@Component({
    selector: 'ui-card',
    standalone: true,
    template: `
    <div class="bg-white rounded-xl shadow-sm p-6">
      @if (label()) {
        <p class="text-sm text-gray-500 mb-1">{{ label() }}</p>
      }
      <ng-content></ng-content>
    </div>
  `,
})
export class Card {
    label = input<string>();
}