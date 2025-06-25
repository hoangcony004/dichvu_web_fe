import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private access_token = 'access_token';
  private user = 'user';

  constructor(private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem(this.access_token, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.access_token);
  }

  logout(): void {
    localStorage.removeItem(this.access_token);
    localStorage.removeItem(this.user);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      return !decoded.exp || decoded.exp <= now;
    } catch (err) {
      return true;
    }
  }

  isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }

  autoLogoutIfExpired(): void {
    if (this.isTokenExpired()) {
      this.logout();
      this.router.navigate(['/admin/login']);
    }
  }

  getUserInfo(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }
}
