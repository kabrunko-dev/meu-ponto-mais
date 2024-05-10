import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import SignInResponse from '../../core/models/sign-in.model';

@Injectable()
export default class LoginService {
  private http = inject(HttpClient);

  signIn(email: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('/auth/sign_in', { email, password });
  }

  signOut(): Observable<never> {
    return this.http.delete<never>('/auth/sign_out');
  }
}
