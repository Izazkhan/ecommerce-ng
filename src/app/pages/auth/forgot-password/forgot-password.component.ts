import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="row d-flex justify-content-center align-items-center vh-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card">
              <div class="card-body px-5">
                  <form autofill="off">

                      <div class="mb-md-3 mt-md-4 pb-3">
                        <i class="icon lock"></i>
                          <h2 class="fw-bold mb-2 text-uppercase">Forgot Password</h2>
                          <p class="text-dark mb-3">Provide your account email in which you can reset your password.</p>

                          <div class="mb-3">
                              <label class="form-label">Email</label>
                              <input type="email" name="email" class="form-control" autocomplete="new-email"
                                  placeholder="Enter email" formControlName="email"/>
                          </div>
                          <button class="btn btn-primary form-control px-5 mb-3" type="submit">Next</button>
                          <div>
                              <p class="mb-0">Want to Sign in? <a routerLink="/signin" class="fw-bold">Click Here</a>
                              </p>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </div>
  `,
  styles: ``
})
export class ForgotPasswordComponent {

}
