import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SharedModule } from '../../../../shared/shared.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { CommonService } from '../../../../core/custom/common.service';
import { PAGE_SIZE, STATUS_ACTION, USER_ROLE } from '../../../../core/custom/constants';
import {
  DichVuWeb_Service,
  PagedResultSysUser,
  PageModel,
  SysUser,
  UserPageModelCustom,
} from '../../../../core/service/dichvuweb.service';
import { ToastrService } from 'ngx-toastr';
import { DialogConfirmComponent } from '../../../../shared/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    PaginationComponent,
    MatTooltipModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  title = 'Quản lý người dùng';
  data: SysUser[] = [];
  totalItems = 0;
  totalPages = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  target: SysUser = new SysUser();
  message_toast: string | undefined = '';

  pageModel: UserPageModelCustom = new UserPageModelCustom({
    currentPage: 1,
    pageSize: PAGE_SIZE,
    strKey: '',
    role: USER_ROLE,
  });

  constructor(
    // private router: Router,
    private titleService: Title,
    private dialog: MatDialog,
    private commonService: CommonService,
    private service: DichVuWeb_Service,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.loadData();
  }

  loadData(): void {
    this.service.apiPrivateUsersSearchPagingCustom(this.pageModel).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          this.data = response.data?.data ?? [];
          this.currentPage = response.data?.currentPage ?? 1;
          this.totalPages = response.data?.totalPages ?? 0;
          this.totalItems = response.data?.totalElements ?? 0;
          this.pageModel.currentPage = this.currentPage;
  
          if (this.data.length === 0) {
            this.toastr.warning(this.message_toast || 'Không tìm thấy dữ liệu!', 'Thông báo');
          }
        } else {
          this.toastr.error(response.message || 'Không thể tải dữ liệu', 'Lỗi');
        }
      },
      error: () => {
        this.toastr.error('Đã có lỗi gì đó sảy ra', 'Lỗi');
      },
    });
  }
  

  onSearch() {
    this.pageModel.currentPage = 1;
    this.loadData();
  }

  changePage(page: number): void {
    this.pageModel.currentPage = page;
    this.loadData();
  }

  getStatusText(status?: number): string {
    switch (status) {
      case 0:
        return 'Chưa kích hoạt';
      case 1:
        return 'Hoạt động';
      case 2:
        return 'Đã khóa';
      default:
        return 'Không xác định';
    }
  }

  getStatusClass(status?: number): string {
    switch (status) {
      case 0:
        return 'bg-secondary';
      case 1:
        return 'bg-success';
      case 2:
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  openCreateDialog() {
    this.dialog
      .open(
        UserCrudComponent,
        this.commonService.configDialog('80%', {
          key: null,
          actionType: STATUS_ACTION.create,
        }, false) // 👈 true: không cho đóng khi click ngoài
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.loadData();
        }
      });
  }
  

  openDetailDialog(key: number) {
    this.dialog
      .open(
        UserCrudComponent,
        this.commonService.configDialog('80%', {
          key: key,
          actionType: STATUS_ACTION.detail,
        })
      )
      .afterClosed()
      .subscribe(() => {});
  }

  openEditDialog(key: number) {
    this.dialog
      .open(
        UserCrudComponent,
        this.commonService.configDialog('80%', {
          key: key,
          actionType: STATUS_ACTION.edit,
        })
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.loadData();
        }
      });
  }

  openDeleteDialog(key: number, title?: string) {
    this.dialog
      .open(DialogConfirmComponent, {
        width: '30%',
        data: {
          title: 'Xác nhận',
          message: `Bạn có chắc chắn xóa <b>${title}</b> ?`,
          color: 'text-danger',
          type: 1,
          icon: 'exclamation-triangle',
          isAppend: true,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          const user = localStorage.getItem('user');
          if (user) {
            const userData = JSON.parse(user);
            const currentUserId = userData.id;
      
            if (key === currentUserId) {
              this.toastr.warning('Tài khoản đăng đăng nhập không thể xóa!', 'Cảnh báo');
              return;
            }
          }
      
          this.service.apiPrivateUsersDelete(key).subscribe({
            next: (res) => {
              this.toastr.success(
                res.message || 'Xóa thành công!',
                'Thành công'
              );
              this.loadData();
            },
            error: (err) => {
              this.toastr.error('Lỗi khi gọi API: ' + err?.message, 'Lỗi');
            }
          });
        }
      });      
  }
}
