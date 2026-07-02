import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Entity } from '../entities/entity.entity';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  protected http = inject(HttpClient);

  getExaples(filters?:{dataDa?: string;}){
    return this.http.get<Entity[]>(`/api/example`);
  }

  getExamplesById(id: number){
    return this.http.get<Entity[]>(`/api/example/${id}`);
  }

  getCategories(){
    return this.http.get<any[]>(`/api/example/categorie`);
  }
  edit(id: number,  categoria: number, descrizione: string){
    return this.http.put<any>(`/api/example/${id}`, { categoria, descrizione });
  }

  delete(id: number){
    return this.http.delete<any>(`/api/example/${id}`);
  }
}
