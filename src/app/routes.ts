import { Routes } from '@angular/router';

import LoginComponent from './features/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => LoginComponent,
  },
  {
    path: 'board',
    loadComponent: () => LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

export default routes;
