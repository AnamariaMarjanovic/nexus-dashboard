import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';

@Component({
    selector: 'ui-error-state',
    standalone: true,
    imports: [Button],
    template: `
    <div class="flex flex-col items-center justify-center text-center py-16 px-6 bg-white rounded-xl shadow-sm">
      <p class="text-sm text-gray-600 mb-4">{{ message() }}</p>
      <ui-button variant="secondary" (click)="retry.emit()">Try again</ui-button>
    </div>
  `,
})
export class ErrorState {
    message = input('Something went wrong.');
    retry = output<void>();
}