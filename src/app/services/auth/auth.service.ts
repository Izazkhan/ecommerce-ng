import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface UserRegisterRequest {
  name: string,
  email: string,
  password: string
}

interface UserLoginRequest {
  email: string,
  password: string
}

interface UserLoginResponse {
  msg: string,
  token: string
}

interface PasswordResetRequest {
  token: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  register(user: UserRegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(user: UserLoginRequest): Observable<any> {
    return this.http.post<UserLoginResponse>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  resetPasswordEmail(email: string): Observable<any> {
    // TODO
    return this.http.post<any>(this.apiUrl + '/password/email', {email});
  }

  resetPassword(form: PasswordResetRequest): Observable<any> {
    // TODO
    return this.http.post<any>(this.apiUrl + '/password/reset', {
      token: form.token,
      password: form.password,
    });
  }
}
