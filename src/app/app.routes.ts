import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: '**', component: NotFound } // Ensure casing matches the import!
];
