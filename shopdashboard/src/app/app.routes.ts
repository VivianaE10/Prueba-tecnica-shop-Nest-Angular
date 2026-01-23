import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Categories } from './pages/categories/categories';
import { Products } from './pages/products/products'; // Importa el componente Products

export const routes: Routes = [
  { path: 'login', component: Login }, // Ruta para la página de login
  { path: 'dashboard', component: Dashboard }, // Ruta para la pagina de dashboard
  { path: 'categories', component: Categories }, // Ruta para el formulario de categorías
  { path: 'products', component: Products }, // Ruta para el formulario de productos
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
