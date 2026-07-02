import { Component, inject } from '@angular/core';
import { ExampleService } from '../../services/example.service';
import { combineLatest, startWith, Subject, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDefaultComponent } from '../../components/modals/modal-default/modal-default.component';
import { Entity } from '../../entities/entity.entity';

@Component({
  selector: 'app-example',
  standalone: false,
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent {
  protected exampleSrv = inject(ExampleService);
  protected authSrv = inject(AuthService);
  protected modalSrv = inject(NgbModal);
  protected refreshSubject = new Subject<void>();

  user$ = this.authSrv.currentUser$;
  entity$ = this.refreshSubject.pipe(
    startWith(undefined),
    switchMap(() => this.exampleSrv.getExaples())
  );

  delete(id: number){
    this.exampleSrv.delete(id).subscribe(() => this.refreshSubject.next());
  }

  openModal(entity: Entity) {
    const modalRef = this.modalSrv.open(ModalDefaultComponent);
    modalRef.componentInstance.entity = entity;
    modalRef.result.then((formValues) => {
      this.exampleSrv.edit(entity.EntityID, formValues.categoria, formValues.descrizione).subscribe(() => this.refreshSubject.next());
    });
  }
}
