import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

export interface MonthData {
  mese: number;
  totale: number;
}

// Il grafico vuole { name: string, value: number }
export interface ChartDataPoint {
  name: string;
  value: number;
}

@Component({
  selector: 'app-charts-page',
  standalone: false,
  templateUrl: './charts-page.component.html',
  styleUrls: ['./charts-page.component.css']
})
export class ChartsPageComponent implements OnInit {
  protected chartSrv = inject(ChartService);
  private destroyRef = inject(DestroyRef);

  chartData: ChartDataPoint[] = [];

  view: [number, number] = [700, 400];
  colorScheme = 'vivid';

  private readonly monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                                 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  ngOnInit(): void {
    this.chartSrv.month()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((data: MonthData[]) => 
          data.map(item => ({
            name: this.monthNames[item.mese - 1] || item.mese.toString(),
            value: item.totale
          }))
        )
      )
      .subscribe((transformedData: ChartDataPoint[]) => {
        this.chartData = transformedData;
        console.log('Dati trasformati per il grafico:', this.chartData);
      });
  }

  onSelect(event: any): void {
    console.log('Selezionato:', event);
  }
}