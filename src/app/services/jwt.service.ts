import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly TOKEN_KEY = 'authToken';

  getPayload<T>() {
    const authTokens = this.getToken();
    if (!authTokens) {
      return null;
    }
    return jwtDecode<T>(authTokens);
  }

  areTokensValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) {
        return true;
      }
      console.log(decoded.exp * 1000 > Date.now());
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      this.removeToken();
      return null;
    }
    return token;
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}