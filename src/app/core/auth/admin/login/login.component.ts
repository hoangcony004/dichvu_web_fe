import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DichVuWeb_Service, LoginRequestDTO } from '../../../service/dichvuweb.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [SharedModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  title = 'Đăng nhập hệ thống';
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private toastr: ToastrService,
    private service: DichVuWeb_Service
  ) {}

  private route = inject(ActivatedRoute);
  private returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin đăng nhập', 'Lỗi');
      return;
    }

    const loginRequestDTO = new LoginRequestDTO();
    loginRequestDTO.username = this.username;
    loginRequestDTO.password = this.password;

    this.service.apiLogin(loginRequestDTO).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS' && response.data?.token) {
          // Lưu token và menu vào localStorage
          localStorage.setItem('token', response.data.token);
          if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          } else {
            console.error("User is undefined, cannot save to localStorage.");
          }
          
          this.toastr.success('Đăng nhập thành công', 'Thông báo');
          // Điều hướng tới returnUrl nếu có, mặc định về dashboard
          const targetUrl = this.returnUrl && this.returnUrl !== '/' ? this.returnUrl : '/admin/dashboard';
          this.router.navigateByUrl(targetUrl);
          
        } else {
          this.isLoading = false;
          this.toastr.error(response.message || 'Đăng nhập thất bại', 'Lỗi');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Login error:', error);
        if (error.status === 0) {
          this.toastr.error(
            'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.',
            'Lỗi'
          );
        } else if (error.status === 401) {
          this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng', 'Lỗi');
        } else if (error.status === 500) {
          this.toastr.error('Lỗi máy chủ. Vui lòng thử lại sau.', 'Lỗi');
        } else {
          this.toastr.error('Đăng nhập thất bại. Vui lòng thử lại sau.', 'Lỗi');
        }
      },
      complete: () => {
        // Chỉ reset loading khi đăng nhập thành công
        if (!localStorage.getItem('token')) {
          this.isLoading = false;
        }
      },
    });

  }
}
