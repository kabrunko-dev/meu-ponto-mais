import { Routes } from '@angular/router';

import LoginComponent from './features/login/login.component';
import BoardComponent from './features/board/board.component';
import PageNotFoundComponent from './page-not-found.component';
import loggedUserGuard from './core/guards/logged-user.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => LoginComponent,
    canActivate: [loggedUserGuard],
  },
  {
    path: 'board',
    loadComponent: () => BoardComponent,
    canActivate: [loggedUserGuard],
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
];

export default routes;
