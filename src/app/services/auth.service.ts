import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, map, of, ReplaySubject, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { User } from '../entities/user.entity';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected http = inject(HttpClient);
  protected jwtSrv = inject(JwtService);
  protected router = inject(Router);

  protected _currentUser$ = new ReplaySubject<User | null>(1);
  currentUser$ = this._currentUser$.asObservable();

  isAuthenticated$ = this.currentUser$.pipe(
    map(user => !!user),
    distinctUntilChanged()
  );

  constructor() {
    const tokenValid = this.jwtSrv.areTokensValid();
    console.log('token valido');
    if (!tokenValid) {
      this.logout();
    } else {
      // Chiama il server per ottenere i dati completi e con i nomi corretti
      this.fetchUser().subscribe();
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>('/api/utenti/login', { email, password }).pipe(
      tap(res => this.jwtSrv.setToken(res.token)),
      tap(res => this._currentUser$.next(res.user)),
      map(res => res.user)
    );
  }

  register(nome: string, cognome: string, ruolo: string, email: string, password: string) {
    return this.http.post<any>('/api/utenti/register', { nome, cognome, ruolo, email, password });
  }

  fetchUser() {
    console.log('me request');
    return this.http.get<User>('/api/utenti/me').pipe(
      catchError(_ => {
        this.logout();
        return of(null);
      }),
      tap(user => this._currentUser$.next(user))
    );
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/login']);
  }
}