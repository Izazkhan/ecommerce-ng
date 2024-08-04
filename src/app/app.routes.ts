import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { authGuard } from './helpers/guards/auth.guard';
import { AuthLayoutComponent } from './pages/auth/auth-layout/auth-layout.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '', component: HomeComponent
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
                path: 'register',
                title: 'Register',
                component: RegisterComponent
            },
            {
                path: 'forgot-password',
                title: 'Forgot Password',
                component: ForgotPasswordComponent
            }
        ]
    }
];
