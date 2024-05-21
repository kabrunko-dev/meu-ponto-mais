import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import AuthService from '../services/auth.service';

// TODO: Improve guard conditionals
const loggedUserGuard: CanActivateFn = (
  _: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isLoginPath = state.url === '/login';

  if (auth.isLogged()) {
    if (isLoginPath) {
      router.navigate(['board']);
    }
  } else {
    if (!isLoginPath) {
      router.navigate(['login']);
    }
  }

  return true;
};

export default loggedUserGuard;
