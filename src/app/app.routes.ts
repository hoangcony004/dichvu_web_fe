import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/errors/not-found/not-found.component';
import { AuthGuard } from './core/guard/client/auth.guard';

export const routes: Routes = [
    {
      path: 'admin',
      loadChildren: () =>
        import('./module/apps/admin/admin.routes').then((m) => m.AdminRoutes),
      canActivate: [AuthGuard] // 👉 Bắt buộc phải qua guard
    },
    {
      path: '',
      redirectTo: 'apps',
      pathMatch: 'full',
    },
    {
      path: '',
      loadChildren: () =>
        import('./module/apps/client/client.routes').then((m) => m.ClientRoutes),
    },
    { path: '**', component: NotFoundComponent },
  ];
  
