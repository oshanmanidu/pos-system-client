import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieManagerService } from '../../services/cookie-manager';

const TOKEN_KEY = 'auth_token';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-dashboard-context',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
  ],
  templateUrl: './dashboard-context.html',
  styleUrl: './dashboard-context.scss',
})
export class DashboardContext {
  private router        = inject(Router);
  private cookieManager = inject(CookieManagerService);

  sidebarCollapsed = signal(false);

  navItems: NavItem[] = [
    { label: 'Customers', icon: 'people',       route: '/dashboard/customers' },
    { label: 'Products',  icon: 'inventory_2',  route: '/dashboard/products'  },
    { label: 'Orders',    icon: 'receipt_long', route: '/dashboard/orders'    },
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  logout(): void {
    this.cookieManager.deleteToken(TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}