import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface LoginResponse {
  access: string;
  refresh: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}users/`;
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      // Decode token to get user info (simplified)
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUserSubject.next(payload.user_id ? { id: payload.user_id } : null);
    }
  }

  login(credentials: { username: string; password: string }, isAdmin: boolean = false): Observable<LoginResponse> {
    const endpoint = isAdmin ? 'admin_login/' : 'login/';
    return this.http.post<LoginResponse>(`${this.baseUrl}${endpoint}`, credentials).pipe(
      tap(response => {
        if (response && response.access) {
          localStorage.setItem(this.tokenKey, response.access);
          localStorage.setItem(this.refreshTokenKey, response.refresh);
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}
