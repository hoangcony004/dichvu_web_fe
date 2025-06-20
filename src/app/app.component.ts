import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  template: ` <router-outlet></router-outlet>
    <app-spinner></app-spinner>`,
})
export class AppComponent implements OnInit {
  title = 'Admin - Dịch vụ web';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogoutIfExpired();
  }
  
}
