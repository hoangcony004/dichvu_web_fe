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
import { STATUS_ACTION } from '../../../../core/custom/constants';

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

  constructor(
    // private router: Router,
    private titleService: Title,
    private dialog: MatDialog,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  loadData(): void {}

  onSearch() {}

  openCreateDialog() {
    this.dialog
      .open(
        UserCrudComponent,
        this.commonService.configDialog('80%', {
          key: null,
          actionType: STATUS_ACTION.create,
        })
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.loadData();
        }
      });
  }

  openDetailDialog() {}

  openEditDialog() {}

  openDeleteDialog() {}
}
