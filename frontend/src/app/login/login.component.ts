import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.auth.login(this.username, this.password).subscribe(isLogged => {
      if (isLogged) {
        this.router.navigate(['/tasks']).then(() => {
          window.location.reload();
        });
      } else {
        this.errorMessage = 'Invalid credentials!';
      }
    });
  }
}
