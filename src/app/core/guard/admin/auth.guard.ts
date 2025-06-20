import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.checkLogin();
  }

  canActivateChild(): boolean {
    return this.checkLogin();
  }

  private checkLogin(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }

    // 🔒 Token hết hạn hoặc không hợp lệ
    this.auth.logout();
    this.router.navigate(['/admin/login']);
    return false;
  }
}
