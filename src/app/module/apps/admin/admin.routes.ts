import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const AdminRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../../../core/auth/admin/auth-admin.routes').then((m) => m.AuthAdminRoutes),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
