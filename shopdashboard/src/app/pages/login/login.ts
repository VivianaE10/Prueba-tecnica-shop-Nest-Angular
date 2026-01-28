/**
 * Componente de login para autenticación ficticia.
 * Contiene campos para usuario, contraseña y checkbox de admin.
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa el Router para la navegación

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';
  admin = false;
  error = '';
  usernameTouched = false;
  passwordTouched = false;
  adminTouched = false;

  constructor(private router: Router) {}

  onLogin() {
    this.usernameTouched = true;
    this.passwordTouched = true;
    this.adminTouched = true;

    if (!this.username || !this.password || !this.admin) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }
    this.error = '';
    this.router.navigate(['/dashboard']);
  }
}
