import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

// ✅ Aligned to actual CustomerSchema fields: name, address, salary, contact
export interface Customer {
  _id?:    string;
  name:    string;
  address: string;
  salary:  string;
  contact: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private http    = inject(HttpClient);
  // ✅ Base URL matches index.js: app.use('/api/v1/customers', CustomerRoute)
  private baseUrl = `${environment.baseUrl}/api/v1/customers`;

  getAll(): Observable<ApiResponse<Customer[]>> {
    // ✅ Matches route: GET /load-all
    return this.http.get<ApiResponse<Customer[]>>(`${this.baseUrl}/load-all`);
  }

  getById(id: string): Observable<ApiResponse<Customer>> {
    // ✅ Matches route: GET /find-by-id/:id
    return this.http.get<ApiResponse<Customer>>(`${this.baseUrl}/find-by-id/${id}`);
  }

  create(payload: Omit<Customer, '_id'>): Observable<ApiResponse<Customer>> {
    // ✅ Matches route: POST /create
    return this.http.post<ApiResponse<Customer>>(`${this.baseUrl}/create`, payload);
  }

  update(id: string, payload: Partial<Customer>): Observable<ApiResponse<Customer>> {
    // ✅ Matches route: PUT /update/:id
    return this.http.put<ApiResponse<Customer>>(`${this.baseUrl}/update/${id}`, payload);
  }

  delete(id: string): Observable<ApiResponse<null>> {
    // ✅ Matches route: DELETE /delete/:id
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${id}`);
  }
}