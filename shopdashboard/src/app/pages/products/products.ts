// ...existing code...
//logica del componente de productos
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
})
export class Products implements OnInit, OnDestroy {
  private routerSubscription: Subscription | undefined;
  name: string = '';
  description: string = '';
  price: number | undefined;
  stock: number | undefined;
  is_active: boolean = true;
  category_id: number | undefined;
  success = false;
  error = '';
  products: Product[] = [];
  loading = false;
  editId: number | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // Si la ruta tiene un parámetro id, cargar el producto para edición
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      // Siempre recargar la lista de productos al entrar a la página
      this.getProducts();
      if (id) {
        this.editId = +id;
        // Limpiar el formulario antes de cargar
        this.name = '';
        this.description = '';
        this.price = undefined;
        this.stock = undefined;
        this.is_active = true;
        this.category_id = undefined;
        this.productService.getProducts().subscribe((products: Product[]) => {
          const prod = products.find((p) => p.id === this.editId);
          if (prod) {
            this.name = prod.name ?? '';
            this.description = prod.description ?? '';
            this.price = prod.price;
            this.stock = prod.stock;
            this.is_active = prod.is_active ?? true;
            this.category_id = prod.category_id;
          }
        });
      } else {
        this.editId = null;
      }
    });
  }

  ngOnDestroy() {}

  getProducts() {
    this.loading = true;
    console.log('Llamando a getProducts() (products.ts)');
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        console.log('Datos recibidos (products.ts):', data);
        // Si el backend retorna los productos con la relación de categoría, mapeamos para mostrar el nombre
        this.products = data.map((p) => ({
          ...p,
          category_id: p.category?.id || p.category_id,
          category_name: p.category?.name || '',
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
        this.loading = false;
        console.error('Error al cargar productos (products.ts):', err);
      },
    });
  }

  onSubmit() {
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
    const price = Number(this.price);
    const stock = Number(this.stock);
    const category_id = Number(this.category_id);
    if (isNaN(price) || isNaN(stock) || isNaN(category_id) || price < 0 || stock < 0) {
      this.error = 'Precio, stock y categoría deben ser números válidos y positivos';
      this.success = false;
      return;
    }
    if (this.editId) {
      // Actualizar producto
      this.productService
        .updateProduct(this.editId, {
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
            this.onCancelEdit();
            void this.router.navigate(['/products/list']);
          },
          error: () => {
            this.success = false;
            this.error = 'Error al actualizar el producto';
          },
        });
    } else {
      // Crear producto
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
            void this.router.navigate(['/products/list']);
          },
          error: () => {
            this.success = false;
            this.error = 'Error al guardar el producto';
          },
        });
    }
  }

  onDelete(id: number) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.getProducts(),
        error: () => (this.error = 'Error al eliminar el producto'),
      });
    }
  }

  onEdit(product: Product) {
    this.editId = product.id;
    this.name = product.name ?? '';
    this.description = product.description ?? '';
    this.price = product.price;
    this.stock = product.stock;
    this.is_active = product.is_active ?? true;
    this.category_id = product.category_id;
  }

  onCancelEdit() {
    this.editId = null;
    this.name = '';
    this.description = '';
    this.price = undefined;
    this.stock = undefined;
    this.is_active = true;
    this.category_id = undefined;
  }

  goToDashboard() {
    void this.router.navigate(['/dashboard']);
  }

  goToLogin() {
    void this.router.navigate(['/login']);
  }
}
