import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-default',
  standalone: false,
  templateUrl: './modal-default.component.html',
  styleUrl: './modal-default.component.css'
})
export class ModalDefaultComponent {

  protected fb = inject(FormBuilder);
  protected modal = inject(NgbActiveModal);

  default: any;

  defaultForm = this.fb.group({
    default: ['', {validators: [Validators.required]}]
  })

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
