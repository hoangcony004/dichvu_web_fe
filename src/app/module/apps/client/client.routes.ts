import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutClientComponent } from '../../../shared/layouts/client/layout-client/layout-client.component';
import { ContactComponent } from './contact/contact.component';

export const ClientRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../../../core/auth/client/auth-client.routes').then(
        (m) => m.AuthClientRoutes
      ),
  },
  {
    path: 'apps',
    component: LayoutClientComponent,
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];
