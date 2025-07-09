import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/']); // Chưa đăng nhập → đá về home
      return false;
    }

    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    const roles = decoded.roles || [];

    if (roles.includes('ADMIN')) {
      return true; // Có quyền ADMIN → cho vào
    }

    // Không phải ADMIN → đá về client
    this.router.navigate(['/']);
    return false;
  }
}
