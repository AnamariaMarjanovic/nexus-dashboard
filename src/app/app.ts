import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedStateService } from '@nexus-dashboard/ui';


@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'nexus-dashboard';
  protected sharedState = inject(SharedStateService);

  onOrgChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sharedState.setActiveOrg(value);
  }
}