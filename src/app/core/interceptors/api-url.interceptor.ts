import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

export default function apiUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const nextReq = req.clone({
    url: 'https://api.pontomais.com.br/api' + req.url,
  });

  return next(nextReq);
}
