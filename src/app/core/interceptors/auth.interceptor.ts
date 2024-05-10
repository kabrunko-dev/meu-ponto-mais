import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import AuthService from '../services/auth.service';
import LocalStorageService from '../services/local-storage.service';

export default function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const localStorage = inject(LocalStorageService);
  const router = inject(Router);
  const auth = inject(AuthService).get();

  let nextReq = req;

  if (router.url !== '/login') {
    if (!auth) {
      const isSessionActive = localStorage.getItem('session');
      if (!isSessionActive) router.navigate(['login']);
    }

    nextReq = req.clone({
      headers: new HttpHeaders({
        'Access-Token': auth!.token,
        client: auth!.clientId,
        uid: auth!.uid,
      }),
    });
  }

  return next(nextReq);
}
