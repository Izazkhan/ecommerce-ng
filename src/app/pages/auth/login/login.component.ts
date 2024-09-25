import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StateService } from 'src/app/services/global-state/state.service';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CounterComponent],
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    if (this.loginForm.valid) {

      // Login the user
      this.authService.login(this.loginForm.value).subscribe({
        error: () => {
          alert('Login failed');
        },
        next: () => {
          const intendedUrl = this.route.snapshot.queryParams['intended'] || '/profile';
          this.router.navigateByUrl(intendedUrl);
        }
      })
    }
  }
}
