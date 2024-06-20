import { Routes } from '@angular/router';

import LoginComponent from './features/login/login.component';
import BoardComponent from './features/board/board.component';
import loggedUserGuard from './core/guards/logged-user.guard';
import PageNotFoundComponent from './page-not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [loggedUserGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => LoginComponent,
      },
      {
        path: 'board',
        loadComponent: () => BoardComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

export default routes;
