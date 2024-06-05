import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import routes from './routes';
import apiUrlInterceptor from './core/interceptors/api-url.interceptor';
import authInterceptor from './core/interceptors/auth.interceptor';
import loadingInterceptor from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([loadingInterceptor, apiUrlInterceptor, authInterceptor])
    ),
    provideRouter(routes),
  ],
};
