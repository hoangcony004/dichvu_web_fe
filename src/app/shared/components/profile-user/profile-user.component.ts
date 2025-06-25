import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-user',
  imports: [],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent {

  constructor(
    private dialogRef: MatDialogRef<ProfileUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dataRef: { key: number; actionType: number },
    private toastr: ToastrService,
  ) {}


  onClose(): void {
    this.dialogRef.close();
  }
}
