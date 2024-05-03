import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { EMPTY, catchError } from 'rxjs';

import LoginService from './login.service';
import SpinnerComponent from '../../shared/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, SpinnerComponent],
  providers: [LoginService],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
})
export default class LoginComponent {
  private credentialsService = inject(LoginService);
  private router = inject(Router);
  private nfb = inject(NonNullableFormBuilder);

  isSubmitted = false;
  isLoading = false;
  error = '';

  credentials = this.nfb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  onErrorClick(): void {
    this.error = '';
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (!this.credentials.valid) {
      this.credentials.markAllAsTouched();
      return;
    }

    const { email, password } = this.credentials.getRawValue();

    this.isLoading = true;

    this.credentialsService
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
