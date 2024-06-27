import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login', component: LoginComponent
            }
        ]
    },
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '', component: HomeComponent
            }
        ]
    }
];
