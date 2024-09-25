import { Routes } from '@angular/router';
const LoginComponent = () => import('./pages/auth/login/login.component').then(m => m.LoginComponent);
const AppLayoutComponent = () => import('./layouts/app-layout/app-layout.component').then(m => m.AppLayoutComponent);
const CategoryComponent = () => import('./pages/category/category.component').then(m => m.CategoryComponent);
const RegisterComponent = () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent);
const ProfileComponent = () => import('./pages/user/profile/profile.component').then(m => m.ProfileComponent);
const authGuard = () => import('./helpers/guards/auth.guard').then(m => m.authGuard);
const AuthLayoutComponent = () => import('./pages/auth/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent);
const ForgotPasswordComponent = () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent);
const ResetPasswordComponent = () => import('./pages/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent);
const PageNotFoundComponent = () => import('./pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);

export const routes: Routes = [
    {
        path: '',
        loadComponent: AppLayoutComponent,
        children: [
            {
                path: 'category', loadComponent: CategoryComponent
            },
            {
                path: 'profile', loadComponent: ProfileComponent, canActivate: [authGuard]
            }
        ]
    }, {
        path: '',
        loadComponent: AuthLayoutComponent,
        children: [
            {
                path: 'signin',
                title: 'Login',
                loadComponent: LoginComponent
            },
            {
                path: 'login',
                title: 'Login',
                redirectTo: 'signin'
            },
            {
                path: 'register',
                title: 'Register',
                loadComponent: RegisterComponent
            },
            {
                path: 'forgot-password',
                title: 'Forgot Password',
                loadComponent: ForgotPasswordComponent
            },
            {
                path: 'reset-password/:token',
                title: 'Reset Password',
                loadComponent: ResetPasswordComponent
            }
        ]
    },
    { path: '**', loadComponent: PageNotFoundComponent }
];
