import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import {
  EmployeeResponse,
  SessionResponse,
} from '../../../core/models/session.model';

@Injectable()
export default class SessionService {
  private http = inject(HttpClient);

  getSession(): Observable<EmployeeResponse> {
    return this.http
      .get<SessionResponse>('/session')
      .pipe(map((response) => response.session.employee));
  }
}
