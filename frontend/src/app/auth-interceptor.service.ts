import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = this.auth.getAuthHeader();
    const cloned = authHeader
      ? req.clone({ setHeaders: { Authorization: authHeader } })
      : req;

    return next.handle(cloned).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.auth.forceLogout();
          return throwError(() => new Error('Unauthorized - please log in again.'));
        }
        return throwError(() => err);
      })
    );
  }
}
