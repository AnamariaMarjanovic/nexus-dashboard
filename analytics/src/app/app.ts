import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
@Component({
  imports: [RouterModule, NgxChartsModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'analytics';

  revenueData = [
    {
      name: 'Jan',
      value: 12400
    },
    {
      name: 'Feb',
      value: 14800
    },
    {
      name: 'March',
      value: 13200
    },
    {
      name: 'Apr',
      value: 16900
    },
    {
      name: 'May',
      value: 18200
    }
  ];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4a4ae0'],
  };
}
