import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  stockStatus: 'in-stock' | 'low' | 'out';
}

@Component({
  selector: 'app-dashboard-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './dashboard-product-page.html',
  styleUrl: './dashboard-product-page.scss',
})
export class DashboardProductPage {
  search = signal('');

  products = signal<Product[]>([
    { id: 1, name: 'Wireless Headset Pro', sku: 'WHP-001', category: 'Electronics', price: 89.99,  stock: 142, stockStatus: 'in-stock' },
    { id: 2, name: 'Ergonomic Chair',       sku: 'FRN-045', category: 'Furniture',   price: 349.00, stock: 18,  stockStatus: 'low'      },
    { id: 3, name: 'USB-C Hub 7-in-1',      sku: 'ACC-112', category: 'Accessories', price: 34.50,  stock: 0,   stockStatus: 'out'      },
    { id: 4, name: 'Standing Desk',          sku: 'FRN-067', category: 'Furniture',   price: 599.00, stock: 7,   stockStatus: 'low'      },
    { id: 5, name: 'Mechanical Keyboard',   sku: 'KBD-023', category: 'Electronics', price: 129.99, stock: 55,  stockStatus: 'in-stock' },
    { id: 6, name: 'Webcam 4K',             sku: 'CAM-009', category: 'Electronics', price: 74.00,  stock: 30,  stockStatus: 'in-stock' },
  ]);

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return q
      ? this.products().filter(p =>
          p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      : this.products();
  });

  stockLabel(s: Product['stockStatus']): string {
    return { 'in-stock': 'In stock', low: 'Low stock', out: 'Out of stock' }[s];
  }

  badgeClass(s: Product['stockStatus']): string {
    return { 'in-stock': 'badge--active', low: 'badge--low', out: 'badge--out' }[s];
  }
}