import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExampleService } from '../../../services/example.service';
import { Entity } from '../../../entities/entity.entity';
import { Categoria } from '../../../entities/categoria.entity';

@Component({
  selector: 'app-modal-default',
  standalone: false,
  templateUrl: './modal-default.component.html',
  styleUrl: './modal-default.component.css'
})
export class ModalDefaultComponent implements OnInit {

  protected fb = inject(FormBuilder);
  protected modal = inject(NgbActiveModal);
  protected exampleSrv = inject(ExampleService);
  categories: Categoria[] = [];

  @Input() entity: Entity | null = null;

  defaultForm = this.fb.group({
    categoria: [0, {validators: [Validators.required]}],
    descrizione: ['', {validators: [Validators.required]}]
  })

  ngOnInit() {
    this.exampleSrv.getCategories().subscribe(cats => this.categories = cats);
    if (this.entity) {
      this.defaultForm.patchValue({
        categoria: this.entity.CategoriaID,
        descrizione: this.entity.Descrizione
      });
    }
  }

  closeModal() {
    if (this.defaultForm.valid) {
      this.modal.close(this.defaultForm.value);
      this.defaultForm.reset();
      this.defaultForm.markAsPristine();
    } else {
      this.defaultForm.markAllAsTouched();
    }
  }

  dismissModal() {
    this.defaultForm.reset();
    this.defaultForm.markAsPristine();
    this.modal.dismiss()
  }
}
