import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard', // Selector del componente para el dashboard y me lleva a la dashboard
  imports: [],
  templateUrl: './dashboard.html', // Ruta al archivo HTML del dashboard
})
export class Dashboard {
  constructor(private router: Router) {}

  goToCategories() {
    this.router.navigate(['/categories']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
