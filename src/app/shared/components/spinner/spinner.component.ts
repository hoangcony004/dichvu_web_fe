import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../core/service/spinner.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit {
  isLoading!: Observable<boolean>; // hoặc = of(false)

  constructor(private spinner: SpinnerService) {}

  ngOnInit(): void {
    this.isLoading = this.spinner.loading$;
  }
}

