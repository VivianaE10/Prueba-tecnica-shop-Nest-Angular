//me implemeta la lógica del componente de categorías
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
})
export class Categories implements OnInit, AfterViewInit {
  name = '';
  description = '';
  success = false;
  error = '';
  categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}
  ngAfterViewInit() {
    // Forzar la recarga de categorías después de la vista
    this.loadCategories();
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.categories = [];
        this.cdr.detectChanges();
        console.error('Error al cargar categorías:', err);
      },
    });
  }

  onSubmit() {
    this.categoryService
      .createCategory({ name: this.name, description: this.description })
      .subscribe({
        next: () => {
          this.success = true;
          this.error = '';
          this.name = '';
          this.description = '';
          this.loadCategories();
        },
        error: () => {
          this.success = false;
        },
      });
  }

  // Acción para editar categoría
  onEditCategory(category: any) {
    // Aquí puedes implementar la lógica de edición (abrir modal, navegar, etc.)
    alert('Editar categoría: ' + category.name);
  }

  // Acción para eliminar categoría
  onDeleteCategory(category: any) {
    if (confirm('¿Seguro que deseas eliminar la categoría "' + category.name + '"?')) {
      // Aquí puedes implementar la lógica real de eliminación
      alert('Eliminar categoría: ' + category.name);
      // Ejemplo: this.categoryService.deleteCategory(category.id).subscribe(() => this.loadCategories());
    }
  }

  goToDashboard() {
    void this.router.navigate(['/dashboard']);
  }

  goToLogin() {
    void this.router.navigate(['/login']);
  }
}
