import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable, finalize } from 'rxjs';

import { LoadingService } from '../services';

export default function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
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
