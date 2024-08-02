import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  if (authService.isLoggedIn())
    return true;
  else {
    router.navigate(['/signin'], {queryParams: {intended: state.url}});
    return false;
  }
};
