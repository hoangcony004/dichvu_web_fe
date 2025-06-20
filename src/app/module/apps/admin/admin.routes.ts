import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutAdminComponent } from '../../../shared/layouts/admin/layout-admin/layout-admin.component';
import { AuthGuard } from '../../../core/guard/admin/auth.guard';

export const AdminRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../../../core/auth/admin/auth-admin.routes').then(
        (m) => m.AuthAdminRoutes
      ),
  },
  {
    path: '',
    component: LayoutAdminComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user',
        component: DashboardComponent,
      }
      
    ]
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
