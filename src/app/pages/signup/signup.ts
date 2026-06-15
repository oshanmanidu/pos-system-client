import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private authService = inject(Auth);
  private router      = inject(Router);

  isLoading = false;
  errorMsg  = '';

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  signup(): void {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMsg  = '';

    const { fullName, email, password } = this.form.value;

    this.authService.signup(fullName, email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg  = err?.error?.message ?? 'Signup failed. Please try again.';
      },
    });
  }
}