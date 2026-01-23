import { Component } from '@angular/core';
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
export class Categories {
  name = '';
  description = '';
  success = false;
  error = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  onSubmit() {
    this.categoryService
      .createCategory({ name: this.name, description: this.description })
      .subscribe({
        next: () => {
          this.success = true;
          this.error = '';
          this.name = '';
          this.description = '';
        },
        error: () => {
          this.success = false;
          this.error = 'Error saving category';
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
