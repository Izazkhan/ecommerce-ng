import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidationHelper } from 'src/app/helpers/validation-helpers';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './forgot-password.component.html',
  styles: ``
})

export class ForgotPasswordComponent {
  form: FormGroup;

  statusMessage: string = '';
  errorMsg: string = '';
  formSubmitted: boolean = false;
  displayErrors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validationHelper: ValidationHelper,
  ) {
    this.formSubmitted = false;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })
  }

  get emailControl() {
    return this.form.get('email');
  }

  hasError(field: string, errorKey?: string):boolean {
    return this.validationHelper.hasError(this.form, field, errorKey) && this.displayErrors;
  }

  submit() {
    this.displayErrors = true;
    if (this.form.valid) {
      this.authService.resetPasswordEmail(this.form.value.email).subscribe({
        error: (err) => {
          this.errorMsg = err.error.message;
        },
        next: (response) => {
          this.formSubmitted = true;
          this.statusMessage = `We've emailed your password reset link.`;
          this.displayErrors = false;
        }
      });
    }
  }
}
