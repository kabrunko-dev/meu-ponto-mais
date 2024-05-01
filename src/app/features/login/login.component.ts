import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { EMPTY, catchError } from 'rxjs';

import LoginService from './login.service';
import SpinnerComponent from '../../shared/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, SpinnerComponent],
  providers: [LoginService],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
})
export default class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  isLoading = false;
  error = '';

  private loginService = inject(LoginService);
  private router = inject(Router);

  onSubmit(): void {
    this.isLoading = true;

    const { email, password } = this.credentials;

    this.loginService
      .signIn(email, password)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.error = error.error.error;
          this.isLoading = false;
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.router.navigate(['board']);
      });
  }
}
