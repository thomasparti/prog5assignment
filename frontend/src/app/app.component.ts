import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public auth: AuthService;
  isLoggedIn$: Observable<boolean>;
  title = 'frontend';

  constructor(auth: AuthService) {
    this.auth = auth;
    this.isLoggedIn$ = auth.isLoggedIn$;
  }

  logout(): void {
    this.auth.forceLogout();
  }
}
