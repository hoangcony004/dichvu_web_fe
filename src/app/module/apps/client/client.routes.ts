import { Routes } from '@angular/router';
import { LoginComponent } from '../../../core/auth/admin/login/login.component';

export const ClientRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
