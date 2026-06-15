import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joined: string;
}

@Component({
  selector: 'app-dashboard-customer-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './dashboard-customer-page.html',
  styleUrl: './dashboard-customer-page.scss',
})
export class DashboardCustomerPage {
  search = signal('');

  customers = signal<Customer[]>([
    { id: 1, name: 'Amara Silva',    email: 'amara@example.com',  phone: '+94 77 123 4567', status: 'active',   joined: '2024-01-15' },
    { id: 2, name: 'Dinesh Perera',  email: 'dinesh@example.com', phone: '+94 71 234 5678', status: 'active',   joined: '2024-02-20' },
    { id: 3, name: 'Kavya Mendis',   email: 'kavya@example.com',  phone: '+94 76 345 6789', status: 'inactive', joined: '2023-11-05' },
    { id: 4, name: 'Rajan Fernando', email: 'rajan@example.com',  phone: '+94 70 456 7890', status: 'active',   joined: '2024-03-10' },
    { id: 5, name: 'Nisha Wijesinghe',email:'nisha@example.com',  phone: '+94 72 567 8901', status: 'active',   joined: '2024-04-02' },
  ]);

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return q
      ? this.customers().filter(c =>
          c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
      : this.customers();
  });

  initials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
}