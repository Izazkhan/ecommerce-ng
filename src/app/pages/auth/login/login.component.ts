import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['../../../../styles/auth-styles.scss', './login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onLogin() {
    console.log("onLogin");
  }
}
