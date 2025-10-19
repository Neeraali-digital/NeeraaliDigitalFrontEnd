import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  // Generic GET request
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Generic POST request
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Generic PUT request
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Generic DELETE request
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Generic POST request for FormData (multipart/form-data)
  postFormData<T>(endpoint: string, formData: FormData): Observable<T> {
    const headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<T>(`${this.baseUrl}${endpoint}`, formData, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Generic PUT request for FormData (multipart/form-data)
  putFormData<T>(endpoint: string, formData: FormData): Observable<T> {
    const headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.put<T>(`${this.baseUrl}${endpoint}`, formData, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Token expired or invalid
      this.authService.logout();
      this.router.navigate(['/admin/login']);
    }
    return throwError(error);
  }

  // Specific methods for different endpoints
  getBlogs(): Observable<any[]> {
    return this.get<any[]>('blogs/published/');
  }

  getAllBlogs(): Observable<any[]> {
    return this.get<any[]>('blogs/');
  }

  getEnquiries(): Observable<any[]> {
    return this.get<any[]>('enquiries/');
  }

  getReviews(): Observable<any[]> {
    return this.get<any[]>('reviews/');
  }

  getUsers(): Observable<any[]> {
    return this.get<any[]>('users/');
  }
}
