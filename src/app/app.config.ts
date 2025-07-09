import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { authInterceptor } from './core/interceptor/admin/auth.interceptor';
import { SpinnerInterceptor } from './core/interceptor/spinner.interceptor';
import { httpErrorInterceptor } from './shared/errors/http-error.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        SpinnerInterceptor,
        authInterceptor,
        httpErrorInterceptor,
      ])
    ),
    // ✅ Thêm dòng này để cung cấp JwtHelperService
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
      }),
      NgxSpinnerModule
    ),
    // WaitingService // 👈 Thêm nếu KHÔNG xài providedIn: 'root'
  ],
};
