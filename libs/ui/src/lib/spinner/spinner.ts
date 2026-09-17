import { Component } from '@angular/core';

@Component({
    selector: 'ui-spinner',
    standalone: true,
    template: `
    <div
      class="w-6 h-6 border-2 border-gray-200 border-t-indigo-600 rounded-full animate-spin"
      role="status"
      aria-label="Loading"
    ></div>
  `,
})
export class Spinner { }