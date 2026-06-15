import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Customer, CustomerService } from '../../../../services/customer';


  

export interface CustomerDialogData {
  customer?: Customer;
}

@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './customer-dialog.html',
  styleUrl: './customer-dialog.scss',
})
export class CustomerDialog implements OnInit {
  private dialogRef       = inject(MatDialogRef<CustomerDialog>);
  private customerService = inject(CustomerService);
  readonly data           = inject<CustomerDialogData>(MAT_DIALOG_DATA);

  isEditMode = false;
  isLoading  = false;
  errorMsg   = '';

  // ✅ Form fields aligned to schema: name, address, salary, contact
  form = new FormGroup({
    name:    new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [Validators.required]),
    salary:  new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    contact: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]),
  });

  ngOnInit(): void {
    if (this.data?.customer) {
      this.isEditMode = true;
      const { name, address, salary, contact } = this.data.customer;
      this.form.patchValue({ name, address, salary, contact });
    }
  }

  get title(): string {
    return this.isEditMode ? 'Edit customer' : 'Add customer';
  }

  submit(): void {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMsg  = '';

    const payload = this.form.value as Omit<Customer, '_id'>;

    const request$ = this.isEditMode
      ? this.customerService.update(this.data.customer!._id!, payload)
      : this.customerService.create(payload);

    request$.subscribe({
      next: (res) => {
        this.isLoading = false;
        this.dialogRef.close(res.data);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg  = err?.error?.message ?? 'Something went wrong. Please try again.';
      },
    });
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}