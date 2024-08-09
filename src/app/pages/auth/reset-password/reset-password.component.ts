import { NgIf } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ValidationHelper } from 'src/app/helpers/validation-helpers';
import { AuthService } from 'src/app/services/auth/auth.service';


interface ValidationError {
  [key: string]: boolean // hide
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './reset-password.component.html'
})


export class ResetPasswordComponent {

  form: FormGroup;

  formSubmitted: boolean = false;
  displayErrors: boolean = false;
  errorMsg: string = '';
  statusMessage: string = '';

  showValidationErrors: ValidationError = {
    password: false,
    password_confirmation: false
  }

  constructor(
    private fb: FormBuilder,
    private validationHelper: ValidationHelper,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
      token: ['']
    },{ validators: this.passwordMatchValidator });
  }

  hasError(field: string, errorKey?: string):boolean {
    return this.validationHelper.hasError(this.form, field, errorKey) && this.showValidationErrors[field] && this.displayErrors;
  }
  
  formHasError(errorKey: string):boolean {
    return this.form.hasError(errorKey) && this.displayErrors;
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password')?.value;
    let password_confirmation = control.get('password_confirmation')?.value;
    return password === password_confirmation ? null : { mismatch: true };
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: (params) => {
        this.form.get('token')?.setValue(params.get('token'));
      }
    })

    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (control) {
        control.valueChanges.subscribe(() => {
          this.showValidationErrors[controlName] = false;
        });
      }
    });
  }

  showErrors():void {
    Object.keys(this.showValidationErrors).forEach(controlName => {
      this.showValidationErrors[controlName] = true;
    });
  }

  submit() {
    this.displayErrors = true;
    this.showErrors();
    
    if (this.form.valid) {
      // submit form
      this.authService.resetPassword(this.form.value).subscribe({
        next: (response) => {
          console.log("Success");
          this.statusMessage = `Password Updated successfully.`;
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 1000)
        },
        error: (error) => {
          this.errorMsg = error.error.message;
        }
      });
    }
  }
}
