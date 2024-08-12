import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { authGuard } from './helpers/guards/auth.guard';
import { AuthLayoutComponent } from './pages/auth/auth-layout/auth-layout.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '', component: HomepageComponent
            },
            {
                path: 'profile', component: ProfileComponent, canActivate: [authGuard]
            }
        ]
    }, {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'signin',
                title: 'Login',
                component: LoginComponent
            },
            {
                path: 'login',
                title: 'Login',
                redirectTo: 'signin'
            },
            {
                path: 'register',
                title: 'Register',
                component: RegisterComponent
            },
            {
                path: 'forgot-password',
                title: 'Forgot Password',
                component: ForgotPasswordComponent
            },
            {
                path: 'reset-password/:token',
                title: 'Reset Password',
                component: ResetPasswordComponent
            }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
