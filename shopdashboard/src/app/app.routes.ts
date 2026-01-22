import { Routes } from '@angular/router';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: 'login', component: Login }, // Ruta para la página de login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
