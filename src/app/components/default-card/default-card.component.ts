import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-card',
  standalone: false,
  templateUrl: './default-card.component.html',
  styleUrl: './default-card.component.css'
})
export class DefaultCardComponent {

  @Input()
  default: any;
  @Input()
  user: any;
  @Output() 
  detailClick = new EventEmitter<number>();

  openDetail() {
    this.detailClick.emit(this.default.id);
  }
}
