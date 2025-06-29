import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { STATUS_ACTION, SUCCESS } from '../../../../../core/custom/constants';
import { SharedModule } from '../../../../../shared/shared.module';
import {
  DichVuWeb_Service,
  SysUser,
} from '../../../../../core/service/dichvuweb.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-crud',
  imports: [FormsModule, CommonModule, SharedModule, MatProgressSpinnerModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css',
})
export class UserCrudComponent implements OnInit {
  statusAction = STATUS_ACTION;
  target: SysUser = new SysUser();
  currentActionType!: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    private dialogRef: MatDialogRef<UserCrudComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dataRef: { key: number; actionType: number },
    private toastr: ToastrService,
    private service: DichVuWeb_Service
  ) {}

  ngOnInit(): void {
    this.currentActionType = this.dataRef.actionType;
    this.target.status = 0;
    if (this.currentActionType !== this.statusAction.create) {
      setTimeout(() => this.loadData());
    }
  }

  loadData(): void {
    this.service.apiPrivateUsersGetOne(this.dataRef.key).subscribe({
      next: (res) => {
        if (res?.status === SUCCESS && res.data) {
          Object.assign(this.target, res.data);
          this.createdAt = res.data.createdAt
            ? new Date(res.data.createdAt)
            : undefined;
          this.updatedAt = res.data.updatedAt
            ? new Date(res.data.updatedAt)
            : undefined;
        } else {
          this.toastr.error(res?.message || 'Không có dữ liệu!', 'Lỗi');
        }
      },
      error: (err) => {
        this.toastr.error('Lỗi khi gọi API: ' + err?.message, 'Lỗi');
      },
    });
  }

  onSave(frm: NgForm): void {
    if (frm.invalid) {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin!', 'Lỗi');
      return;
    }

    this.target.createdAt = this.createdAt;
    this.target.updatedAt = this.updatedAt;
    if (this.currentActionType == STATUS_ACTION.create) {
      this.service.apiPrivateUsersInsert(this.target).subscribe({
        next: (res) => {
          if (res?.status === SUCCESS) {
            this.toastr.success(
              res.message || 'Thêm mới thành công!',
              'Thành công'
            );
            this.dialogRef.close(true);
          } else {
            this.toastr.error(res?.message || 'Không thể thêm mới!', 'Lỗi');
          }
        },
        error: (err) => {
          this.toastr.error('Lỗi khi gọi API: ' + err?.message, 'Lỗi');
        },
      });
    } else {
      this.service
        .apiPrivateUsersUpdate(this.dataRef.key, this.target)
        .subscribe({
          next: (res) => {
            if (res?.status === SUCCESS) {
              this.toastr.success(
                res.message || 'Chỉnh sửa thành công!',
                'Thành công'
              );
              this.dialogRef.close(true);
            } else {
              this.toastr.error(res?.message || 'Không thể chỉnh sửa!', 'Lỗi');
            }
          },
          error: (err) => {
            this.toastr.error('Lỗi khi gọi API: ' + err?.message, 'Lỗi');
          },
        });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
