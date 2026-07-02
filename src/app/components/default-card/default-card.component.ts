import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../entities/user.entity';
import { Entity } from '../../entities/entity.entity';

@Component({
  selector: 'app-default-card',
  standalone: false,
  templateUrl: './default-card.component.html',
  styleUrl: './default-card.component.css'
})
export class DefaultCardComponent {

  @Input()
  default!: Entity;
  @Input()
  user!: User;
  @Output() 
  detailClick = new EventEmitter<number>();

  @Output() 
  delete = new EventEmitter<number>();

  @Output()
  edit = new EventEmitter<number>();
  
  openDetail() {
    this.detailClick.emit(this.default.EntityID);
  }
}
