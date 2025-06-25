import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/errors/not-found/not-found.component';

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
    { path: '**', component: NotFoundComponent },
  ];
  
