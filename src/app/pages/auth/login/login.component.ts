import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StateService } from 'src/app/services/global-state/state.service';
import { CounterComponent } from '../counter/counter.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectCurrentCount } from 'src/app/store/counter/counter.selector';
import { increment } from 'src/app/store/counter/counter.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, CounterComponent],
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: FormGroup;
  countVal = 0;
  counter$ = this.store.select(selectCurrentCount);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private stateService: StateService,
    private store: Store<{count: number}>
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.counter$.subscribe(count => {
      this.countVal = count;
      console.log(this.countVal);
    })
  }

  increment() {
    this.store.dispatch(increment());
  }

  inc() {
    this.stateService.incrementCounter();
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
