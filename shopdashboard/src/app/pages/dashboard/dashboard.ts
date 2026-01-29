//componente la loguca del dashboard que me lleva a las categorias y productos
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard', // Selector del componente para el dashboard y me lleva a la dashboard
  imports: [],
  templateUrl: './dashboard.html', // Ruta al archivo HTML del dashboard
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  constructor(private router: Router) {}

  goToCategories() {
    void this.router.navigate(['/categories']);
  }

  goToProducts() {
    void this.router.navigate(['/products']);
  }
}
