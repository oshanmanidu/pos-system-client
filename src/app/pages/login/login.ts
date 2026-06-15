import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Auth } from '../../services/auth';
import { CookieManagerService } from '../../services/cookie-manager';

const TOKEN_KEY = 'auth_token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService   = inject(Auth);
  private cookieManager = inject(CookieManagerService);
  private router        = inject(Router);

  isLoading  = false;
  errorMsg   = '';

  form = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  login(): void {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMsg  = '';

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        // Store JWT in a secure cookie
        this.cookieManager.setToken(response.token, TOKEN_KEY);
        this.router.navigate(['/dashboard/customers']);
      },
      error: (err) => {
        this.isLoading = false;
        // Surface the server message when available, fall back gracefully
        this.errorMsg =
          err?.error?.message ?? 'Login failed. Please check your credentials.';
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}