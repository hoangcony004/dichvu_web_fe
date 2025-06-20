import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DichVuWeb_Service } from '../../../../core/service/dichvuweb.service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  userName: string = '';
  imageLink: string = '';
  userId: number = 0;
  @Output() toggleSidebar = new EventEmitter<void>();
  
  constructor(
    
    private router: Router,
    private toastr: ToastrService,
    private service: DichVuWeb_Service
  ) {}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      // Lấy thông tin người dùng từ localStorage
      this.userName = userData.username;
      this.imageLink = userData.avatarUrl;
      this.userId = userData.id;
    } else {
      this.userName = 'Vô danh';
    }
  }

  logout() {
    const token = localStorage.getItem('token');
    if (token) {
      // Gọi API để thêm token vào blacklist
      this.service.apiLogout(token).subscribe({
        next: (response) => {
          console.log('Logout response:', response);
          // Xóa token và menu từ localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          this.toastr.success('Đăng xuất thành công', 'Thông báo');
          // Đợi 1 giây trước khi chuyển hướng
          timer(500).subscribe(() => {
            this.router.navigate(['/admin/login']).then(() => {
              window.location.reload();
            });
          });
        },
        error: (error: HttpErrorResponse) => {
          // Ngay cả khi có lỗi, vẫn xóa token và chuyển hướng
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.toastr.error('Đăng xuất thất bại', 'Lỗi');
          // Đợi 1 giây trước khi chuyển hướng
          timer(1000).subscribe(() => {
            this.router.navigate(['/admin/login']).then(() => {
              window.location.reload();
            });
          });
        },
      });
    } else {
      // Nếu không có token, chỉ cần chuyển hướng
      this.router.navigate(['/admin/login']);
    }
  }
}
