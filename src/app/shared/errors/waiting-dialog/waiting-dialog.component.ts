import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-waiting-dialog',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './waiting-dialog.component.html',
  styleUrl: './waiting-dialog.component.css'
})
export class WaitingDialogComponent {
  countdown: number;

  constructor(
    public dialogRef: MatDialogRef<WaitingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { seconds: number }
  ) {
    this.countdown = data.seconds;

    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.dialogRef.close();
      }
    }, 1000);
  }
}
