import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutLoginAdminComponent } from '../../../shared/layouts/admin/layout-login-admin/layout-login-admin.component';

export const AuthAdminRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  }
];
