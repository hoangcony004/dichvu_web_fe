import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutAdminComponent } from '../../../shared/layouts/admin/layout-admin/layout-admin.component';

export const AdminRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../../../core/auth/admin/auth-admin.routes').then((m) => m.AuthAdminRoutes),
  },
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },





      
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
