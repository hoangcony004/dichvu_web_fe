import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WaitingDialogComponent } from '../../shared/errors/waiting-dialog/waiting-dialog.component';
import { CommonService } from '../custom/common.service';

@Injectable({
  providedIn: 'root',
})
export class WaitingService {
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService
  ) {}

  showWaitingScreen(seconds: number) {
    this.dialog.open(
        WaitingDialogComponent,
        this.commonService.configDialog(
          '50%',
          { seconds }, // 👈 chỉ data thực sự
          true         // 👈 disableClose riêng
        )
      );
      
  }
}
