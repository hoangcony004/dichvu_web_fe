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
    private route: ActivatedRoute,
    private titleService: Title,
    private toastr: ToastrService,
    private service: DichVuWeb_Service
  ) {}

  returnUrl: string = '/';

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/admin/dashboard';
    });
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
        if (response.status === 'SUCCESS' && response.data?.accessToken) {
          // Lưu token và menu vào localStorage
          localStorage.setItem('access_token', response.data.accessToken);
          if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          
          this.toastr.success('Đăng nhập thành công', 'Thông báo');
          console.log(this.returnUrl)
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
        if (!localStorage.getItem('access_token')) {
          this.isLoading = false;
        }
      },
    });

  }
}
