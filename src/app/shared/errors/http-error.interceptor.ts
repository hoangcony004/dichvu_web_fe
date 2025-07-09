import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { WaitingService } from '../../core/service/waiting.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const waitingService = inject(WaitingService);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 400:
          toastr.error('Yêu cầu không hợp lệ (400)');
          break;
        case 401:
          toastr.warning('Chưa đăng nhập (401)');
          router.navigate(['/admin/login']);
          break;
        case 403:
          toastr.error('Không có quyền truy cập (403)');
          break;
        case 404:
          toastr.error('Không tìm thấy (404)');
          router.navigate(['/**']);
          break;
        case 429:
          // 👇 Gọi màn hình chờ
          const waitSeconds = error.error?.estimatedWaitTime || 5;
          waitingService.showWaitingScreen(waitSeconds);
          // toastr.info(`Bạn đang bị giới hạn. Vui lòng chờ ${waitSeconds} giây.`);
          break;
        case 500:
          toastr.error('Lỗi máy chủ (500)');
          break;
        default:
          toastr.error('Lỗi không xác định');
      }

      return throwError(() => error);
    })
  );
};
