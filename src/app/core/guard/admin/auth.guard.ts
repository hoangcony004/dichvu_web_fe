import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { DichVuWeb_Service } from '../../service/dichvuweb.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthService,
    private router: Router,
    private service: DichVuWeb_Service
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkLogin();
  }
  
  canActivateChild(): Observable<boolean> {
    return this.checkLogin();
  }

  private checkLogin(): Observable<boolean> {
    if (this.auth.isLoggedIn()) {
      return of(true);
    }

    return this.service.apiAuthRefreshToken().pipe(
      switchMap((fileResponse) => {
        const reader = new FileReader();
        const fileReaderObs = new Observable<boolean>((observer) => {
          reader.onload = () => {
            try {
              const text = reader.result as string;
              const json = JSON.parse(text);
              const token = json?.accessToken;

              if (token) {
                localStorage.setItem('access_token', token);
                observer.next(true); // Cho phép truy cập route
              } else {
                console.warn('⚠️ Không có accessToken');
                observer.next(false);
              }
              observer.complete();
            } catch (e) {
              console.error('❌ Parse JSON lỗi:', e);
              observer.next(false);
              observer.complete();
            }
          };

          reader.onerror = () => {
            console.error('❌ Lỗi đọc blob');
            observer.next(false);
            observer.complete();
          };

          reader.readAsText(fileResponse.data);
        });

        return fileReaderObs;
      }),
      catchError((err) => {
        console.error('❌ Refresh token error:', err);
        this.auth.logout();
        this.router.navigate(['/admin/login'], {
          queryParams: { returnUrl: this.router.url },
        });
        return of(false);
      })
    );
  }
}
