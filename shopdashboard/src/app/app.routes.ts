import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard'; // Importa el componente Dashboard

export const routes: Routes = [
  { path: 'login', component: Login }, // Ruta para la página de login
  { path: 'dashboard', component: Dashboard }, // Ruta para la pagina de dashboard
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
