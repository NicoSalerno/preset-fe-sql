import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Subject, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy{
  protected fb = inject(FormBuilder);
  protected authSrv = inject(AuthService);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  protected destroyed$ = new Subject<void>();

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    picture: ['', Validators.required],
    username: ['', {validators: [Validators.required, Validators.email]}],
    password: ['', Validators.required]
  })

  registerError: string = "";

  requestedUrl: string | null = null

  ngOnInit(): void {
      this.registerForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => {
        this.registerError = '';
      });

      this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        map(params => params['requestedUrl'])
      )
      .subscribe(url => {
        this.requestedUrl = url;
      })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  register(){
    const { firstName, lastName, picture, username, password } = this.registerForm.value;
    this.authSrv.register(firstName!, lastName!, picture!, username!, password!)
    .pipe(
      catchError(error => {
        this.registerError = error.error.error;
        return throwError(() => error)
      })
    )
    .subscribe(() => {
      this.router.navigate([this.requestedUrl ? this.requestedUrl : '/login'])
    })
  }

}
