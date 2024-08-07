import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styles: ``
})
export class ForgotPasswordComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required]
    })
  }


  submit() {
    if (this.form.valid) {
      this.authService.resetPasswordEmail(this.form.value.email).subscribe({
        error: (err) => {
          console.log(err)
        },
        next: (response) => {
          console.log(response);
          this.router.navigate(['/password/reset', {email: this.form.value.email}]);
        }
      });
    }
  }
}
