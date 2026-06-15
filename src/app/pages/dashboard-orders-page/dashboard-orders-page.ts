import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'shipped' | 'delivered';
  date: string;
}

@Component({
  selector: 'app-dashboard-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './dashboard-orders-page.html',
  styleUrl: './dashboard-orders-page.scss',
})
export class DashboardOrdersPage {
  search = signal('');

  orders = signal<Order[]>([
    { id: '#ORD-4821', customer: 'Amara Silva',     product: 'Wireless Headset Pro', amount: 89.99,  status: 'delivered', date: '2024-04-10' },
    { id: '#ORD-4820', customer: 'Dinesh Perera',   product: 'Standing Desk',        amount: 599.00, status: 'shipped',   date: '2024-04-09' },
    { id: '#ORD-4819', customer: 'Rajan Fernando',  product: 'Ergonomic Chair',      amount: 349.00, status: 'pending',   date: '2024-04-08' },
    { id: '#ORD-4818', customer: 'Nisha Wijesinghe',product: 'Webcam 4K',            amount: 74.00,  status: 'delivered', date: '2024-04-07' },
    { id: '#ORD-4817', customer: 'Kavya Mendis',    product: 'Mechanical Keyboard',  amount: 129.99, status: 'shipped',   date: '2024-04-06' },
  ]);

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return q
      ? this.orders().filter(o =>
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.product.toLowerCase().includes(q))
      : this.orders();
  });

  // Summary stats
  total     = computed(() => this.orders().reduce((s, o) => s + o.amount, 0));
  pending   = computed(() => this.orders().filter(o => o.status === 'pending').length);
  shipped   = computed(() => this.orders().filter(o => o.status === 'shipped').length);
  delivered = computed(() => this.orders().filter(o => o.status === 'delivered').length);

  badgeClass(s: Order['status']): string {
    return { pending: 'badge--pending', shipped: 'badge--shipped', delivered: 'badge--delivered' }[s];
  }
}