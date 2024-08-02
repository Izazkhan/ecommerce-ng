import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { authGuard } from './helpers/guards/auth.guard';

export const routes: Routes = [
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
    }
];
