//logica del componente de productos
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
})
export class Products {
  name = '';
  description = '';
  price: number | undefined;
  stock: number | undefined;
  is_active = true;
  category_id: number | undefined;
  success = false;
  error = '';

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  onSubmit() {
    // Validación básica
    if (
      !this.name ||
      !this.description ||
      this.price === undefined ||
      this.stock === undefined ||
      this.category_id === undefined
    ) {
      this.error = 'Todos los campos son obligatorios';
      this.success = false;
      return;
    }
    // Asegurar que los valores numéricos sean válidos
    const price = Number(this.price);
    const stock = Number(this.stock);
    const category_id = Number(this.category_id);
    if (isNaN(price) || isNaN(stock) || isNaN(category_id) || price < 0 || stock < 0) {
      this.error = 'Precio, stock y categoría deben ser números válidos y positivos';
      this.success = false;
      return;
    }
    this.productService
      .createProduct({
        name: this.name,
        description: this.description,
        price,
        stock,
        is_active: this.is_active,
        category_id,
      })
      .subscribe({
        next: () => {
          this.success = true;
          this.error = '';
          this.name = '';
          this.description = '';
          this.price = undefined;
          this.stock = undefined;
          this.is_active = true;
          this.category_id = undefined;
        },
        error: () => {
          this.success = false;
          this.error = 'Error al guardar el producto';
        },
      });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
