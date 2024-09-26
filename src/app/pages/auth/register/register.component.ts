import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observer } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StateService } from 'src/app/services/global-state/state.service';
import { CounterComponent } from '../counter/counter.component';
import { increment } from 'src/app/store/counter/counter.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, CommonModule, CounterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['../../../../styles/auth-styles.scss', './register.component.scss'],
})
export class RegisterComponent {
  counter: number = 0;
  registrationForm: FormGroup;

  counter$ = this.store.select('count');
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private stateService: StateService,
    private store: Store<{count: number}>
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    },
      { validators: this.passwordMatchValidator }
    );

    this.stateService.currentCounter$.subscribe((value) => {
      this.counter = value;
    })
  }

  inc() {
    this.stateService.incrementCounter();
  }

  increment() {
    this.store.dispatch(increment());
  }

  // custom validator, for password match
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password')?.value;
    let password_confirmation = control.get('password_confirmation')?.value;
    return password === password_confirmation ? null : { mismatch: true };
  }

  onRegister() {
    // api call
    if (this.registrationForm.valid) {
      // we don't need password confirmation in registration request
      const { password_confirmation, ...user } = this.registrationForm.value;
      this.authService.register(user).subscribe({
        next: () => {
          // registration successful
          // we don't need name in login request
          let { name, ...userLogin } = user;

          // Login the user
          this.authService.login(userLogin).subscribe({
            error: () => {
              alert('Sorry, Automatic login failed. We are redirecting you to Login screen.');
              this.router.navigate(['/login']);
            },
            next: () => {
              this.router.navigate(['/profile']);
            }
          })
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

}
