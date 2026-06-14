import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { DashboardContext } from './pages/dashboard-context/dashboard-context';
import { DashboardCustomerPage } from './pages/dashboard-customer-page/dashboard-customer-page';
import { DashboardProductPage } from './pages/dashboard-product-page/dashboard-product-page';
import { DashboardOrdersPage } from './pages/dashboard-orders-page/dashboard-orders-page';
import { authGuard } from './components/guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'dashboard', component: DashboardContext, canActivate: [authGuard], children: [
        { path: '', redirectTo: '/dashboard/customers', pathMatch: 'full' },
        { path: 'customers', component: DashboardCustomerPage },
        { path: 'products', component: DashboardProductPage },
        { path: 'orders', component: DashboardOrdersPage }



    ]
     }, // Ensure Dashboard and authGuard are imported correctly
    { path: '**', component: NotFound } // Ensure casing matches the import!
];
