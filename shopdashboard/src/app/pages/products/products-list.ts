// ...existing code...
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  is_active?: boolean;
  category_id: number;
  category_name?: string;
  category?: { id: number; name: string };
}

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-list.html',
})
export class ProductsList implements OnInit, OnDestroy {
    goToEdit(id: number) {
      void this.router.navigate([`/products/edit/${id}`]);
    }
  products: Product[] = [];
  loading = false;
  error = '';
  private routerSubscription: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  goToDashboard() {
    void this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {}

  getProducts() {
    this.loading = true;
    console.log('Llamando a getProducts()');
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        console.log('Datos recibidos:', data);
        this.products = data.map((p) => ({
          ...p,
          category_id: p.category?.id || p.category_id,
          category_name: p.category?.name || '',
        }));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
        this.loading = false;
        this.cdr.detectChanges();
        console.error('Error al cargar productos:', err);
      },
    });
  }

  onDelete(id: number) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.getProducts(),
        error: () => (this.error = 'Error al eliminar el producto'),
      });
    }
  }

  goToCreate() {
    void this.router.navigate(['/products/create']);
  }
}
