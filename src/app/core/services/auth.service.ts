import { Injectable } from '@angular/core';

import { Auth } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private auth: Auth | null = null;

  get(): Auth | null {
    return this.auth;
  }

  set(newAuth: Auth | null): void {
    this.auth = newAuth;
  }

  isLogged(): boolean {
    return Boolean(this.get());
  }
}
