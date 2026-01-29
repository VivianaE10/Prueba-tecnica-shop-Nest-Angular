import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Categories } from './pages/categories/categories';
import { Products } from './pages/products/products';
import { ProductsCreate } from './pages/products/products-create';
import { ProductsList } from './pages/products/products-list';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'categories', component: Categories },
  { path: 'products/create', component: ProductsCreate },
  { path: 'products/edit/:id', component: Products },
  { path: 'products/list', component: ProductsList },
  { path: 'products', redirectTo: 'products/list', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
