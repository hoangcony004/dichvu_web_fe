import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { DichVuWeb_Service } from '../../service/dichvuweb.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);

  const access_token = localStorage.getItem('access_token');

  // Clone request và gắn token nếu có
  const authReq = access_token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const returnUrl = window.location.pathname;
        router.navigate(['admin/login'], { queryParams: { returnUrl } });
      }
      return throwError(() => err);
    })
  );
};

// export const authInterceptor: HttpInterceptorFn = (
//   req: HttpRequest<any>,
//   next: HttpHandlerFn
// ) => {
//   const router = inject(Router);
//   const authService = inject(DichVuWeb_Service);

//   const access_token = localStorage.getItem('access_token');

//   const returnUrl = window.location.href;


//   // Bỏ qua nếu là login hoặc refresh-token
//   const isAuthUrl =
//     req.url.includes('/login') || req.url.includes('/refresh-token');
//   if (isAuthUrl) {
//     return next(req);
//   }

//   // Clone request nếu có token
//   const cloneRequest = (token: string) =>
//     req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//       withCredentials: true,
//     });

//   const authReq = access_token ? cloneRequest(access_token) : req;

//   return next(authReq).pipe(
//     catchError((err: HttpErrorResponse) => {
//       if (err.status === 401) {
//         // Token hết hạn → gọi refresh
//         return authService.apiAuthRefreshToken().pipe(
//           switchMap((fileResponse) => {
//             return new Promise<string>((resolve, reject) => {
//               const reader = new FileReader();
//               reader.onload = () => {
//                 try {
//                   const json = JSON.parse(reader.result as string);
//                   const newToken = json.accessToken;
//                   if (!newToken) throw new Error('Không có accessToken');
//                   localStorage.setItem('access_token', newToken);
//                   resolve(newToken);
//                 } catch (error) {
//                   reject(error);
//                 }
//               };
//               reader.onerror = () => reject(reader.error);
//               reader.readAsText(fileResponse.data);
//             });
//           }),
//           switchMap((newToken: string) => {
//             return next(cloneRequest(newToken));
//           }),
//           catchError((refreshError) => {
//             // Refresh token cũng lỗi (hết hạn hoặc không có)
//             localStorage.removeItem('access_token');
//             const returnUrl = window.location.pathname;
//             router.navigate(['admin/login'], { queryParams: { returnUrl } });
//             return throwError(() => refreshError);
//           })
//         );
//       }

//       return throwError(() => err);
//     })
//   );
// };
