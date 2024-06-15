import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable, finalize } from 'rxjs';

import { LoadingService } from '../services';

const URLS_TO_IGNORE = ['/auth/sign_in'];

export default function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (URLS_TO_IGNORE.includes(req.url)) return next(req);

  const loadingService = inject(LoadingService);
  let totalRequests = 0;

  totalRequests++;
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      totalRequests--;

      if (totalRequests <= 0) {
        loadingService.hide();
      }
    })
  );
}
