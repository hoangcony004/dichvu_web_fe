import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'admin',
      loadChildren: () =>
        import('./module/apps/admin/admin.routes').then((m) => m.AdminRoutes),
    },
    {
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full',
    },
    {
      path: 'apps',
      loadChildren: () =>
        import('./module/apps/client/client.routes').then((m) => m.ClientRoutes),
    },
  ];
  
