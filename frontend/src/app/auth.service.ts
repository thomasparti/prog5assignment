import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const LS_KEY = 'isLoggedIn';
const CREDS_KEY = 'authHeader';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    localStorage.getItem(LS_KEY) === 'true'
  );

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  login(username: string, password: string): Observable<boolean> {
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    const nonce = new Date().getTime();
    const url = `/api/task?noCache=${nonce}`;

    const headers = new HttpHeaders({
      Authorization: authHeader,
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this.http.get(url, {
      headers: headers,
      responseType: 'text'
    }).pipe(
      map(() => {
        localStorage.setItem(LS_KEY, 'true');
        localStorage.setItem(CREDS_KEY, authHeader);
        this.isLoggedInSubject.next(true);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(CREDS_KEY);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  forceLogout(): void {
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(CREDS_KEY);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  getAuthHeader(): string | null {
    return localStorage.getItem(CREDS_KEY);
  }
}
