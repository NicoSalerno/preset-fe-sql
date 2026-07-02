import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity } from '../../entities/entity.entity';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-default-table',
  standalone: false,
  templateUrl: './default-table.component.html',
  styleUrl: './default-table.component.css'
})
export class DefaultTableComponent {

  @Input() 
  user: User | null = null;
  @Input() 
  entities: Entity[] = [];

  @Output() 
  rowClick = new EventEmitter<number>(); // emette l'ID dell'entità cliccata
  @Output() 
  detailClick = new EventEmitter<number>(); // emette l'ID per il pulsante dettaglio

  @Output() 
  delete = new EventEmitter<number>();
 
  @Output() 
  edit = new EventEmitter<Entity>();

}
