import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['../../../../styles/auth-styles.scss', './register.component.scss']
})
export class RegisterComponent {

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registrationForm = this.fb.group({
      name: ['Izaz', Validators.required],
      email: ['email@example.com', Validators.required],
      password: ['1234321', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['1234321', [Validators.required]],
    },
      { validators: this.passwordMatchValidator }
    );
  }

  // custom validator, for password match
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password')?.value;
    let password_c = control.get('password_confirmation')?.value;
    return password === password_c ? null : { mismatch: true };
  }

  onRegister() {
    // api call
    if (this.registrationForm.valid) {
      alert("OK");
      // this.authService.register()
    }
  }

}
