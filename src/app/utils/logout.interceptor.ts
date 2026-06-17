import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';

export const logoutInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv = inject(JwtService);
  const router = inject(Router);

  // Opzionale: escludi le chiamate di login/register dalla gestione dell'errore
  const excludedUrls = ['/api/login', '/api/register'];
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token scaduto o non valido -> logout immediato
        authSrv.removeToken();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};