import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  protected http = inject(HttpClient);

  month(){
    return this.http.get<any>(`/api/chart`);
  }
}
