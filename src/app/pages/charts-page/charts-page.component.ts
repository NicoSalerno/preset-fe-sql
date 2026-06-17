import { Component } from '@angular/core';

@Component({
  selector: 'app-charts-page',
  standalone: false,
  templateUrl: './charts-page.component.html',
  styleUrls: ['./charts-page.component.css']
})
export class ChartsPageComponent {

  view: [number, number] = [700, 400];

  chartData = [
    { name: 'Gen', value: 65 },
    { name: 'Feb', value: 59 },
    { name: 'Mar', value: 80 }
  ];

  // Schema colori come stringa (più semplice)
  colorScheme = 'vivid';

  onSelect(event: any): void {
    console.log('Selezionato:', event);
  }
}