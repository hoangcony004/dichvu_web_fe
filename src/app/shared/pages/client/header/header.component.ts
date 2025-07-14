import { Component, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { initHeaderAnimation } from './header.animation';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared.module';
import { ToastrService } from 'ngx-toastr';
import { DichVuWeb_Service } from '../../../../core/service/dichvuweb.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../../core/custom/common.service';
import { ProfileUserComponent } from '../../../components/profile-user/profile-user.component';
import { STATUS_ACTION } from '../../../../core/custom/constants';

@Component({
  selector: 'app-header',
  standalone: true, // thêm nếu bạn dùng Standalone
  imports: [RouterModule, CommonModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit, OnDestroy  {
  showSearch = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private service: DichVuWeb_Service,
    private dialog: MatDialog,
    private commonService: CommonService,
  ) {}

  ngAfterViewInit() {
    initHeaderAnimation();
  }
  
  ngOnDestroy(): void {
  }




  openProfileDialog() {
    this.dialog
      .open(
        ProfileUserComponent,
        this.commonService.configDialog('60%', {
          // key: key,
          actionType: STATUS_ACTION.detail,
        }, true)
      )
      .afterClosed()
      .subscribe(() => {});
  }










  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  @HostListener('window:resize', [])
  onResize() {
    // Nếu resize về màn lớn (lg ~ >= 992px Bootstrap)
    if (window.innerWidth >= 992) {
      this.showSearch = false;
    }
  }

}
