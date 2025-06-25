import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { STATUS_ACTION } from '../../../../../core/custom/constants';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-user-crud',
  imports: [FormsModule, CommonModule, SharedModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {
  statusAction = STATUS_ACTION;
  
  constructor(
    private dialogRef: MatDialogRef<UserCrudComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dataRef: { key: number; actionType: number },
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadData(): void {}

  onSave() {}

  onClose(): void {
    this.dialogRef.close();
  }

}
