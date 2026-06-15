import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

import { CustomerService, Customer } from '../../services/customer';
import { CustomerDialog } from './model/customer-dialog/customer-dialog';

@Component({
  selector: 'app-dashboard-customer-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ],
  templateUrl: './dashboard-customer-page.html',
  styleUrl: './dashboard-customer-page.scss',
})
export class DashboardCustomerPage implements OnInit {
  private customerService = inject(CustomerService);
  private dialog          = inject(MatDialog);

  customers = signal<Customer[]>([]);
  isLoading = signal(false);
  errorMsg  = signal('');
  search    = signal('');

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return q
      ? this.customers().filter(c =>
          c.name.toLowerCase().includes(q) ||      // ✅ was c.fullName
          c.contact.toLowerCase().includes(q))     // ✅ was c.email
      : this.customers();
  });

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading.set(true);
    this.errorMsg.set('');
    this.customerService.getAll().subscribe({
      next:  (res) => { this.customers.set(res.data); this.isLoading.set(false); },
      error: (err) => { this.errorMsg.set(err?.error?.message ?? 'Failed to load customers.'); this.isLoading.set(false); },
    });
  }

  openAdd(): void {
    const ref = this.dialog.open(CustomerDialog, { data: {}, width: '480px', panelClass: 'nexus-dialog' });
    ref.afterClosed().subscribe((saved: Customer | null) => {
      if (saved) this.customers.update(list => [saved, ...list]);
    });
  }

  openEdit(customer: Customer): void {
    const ref = this.dialog.open(CustomerDialog, { data: { customer }, width: '480px', panelClass: 'nexus-dialog' });
    ref.afterClosed().subscribe((saved: Customer | null) => {
      if (saved) this.customers.update(list => list.map(c => c._id === saved._id ? saved : c));
    });
  }

  deleteCustomer(customer: Customer): void {
    if (!confirm(`Delete ${customer.name}? This cannot be undone.`)) return; // ✅ was customer.fullName
    this.customerService.delete(customer._id!).subscribe({
      next:  () => this.customers.update(list => list.filter(c => c._id !== customer._id)),
      error: (err) => alert(err?.error?.message ?? 'Delete failed.'),
    });
  }

  initials(name: string): string { // ✅ parameter unchanged, but caller now passes c.name not c.fullName
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
}