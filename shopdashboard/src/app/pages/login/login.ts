/**
 * Componente de login para autenticación ficticia.
 * Contiene campos para usuario, contraseña y checkbox de admin.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para la navegación

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  constructor(private router: Router) {}

  // Método que simula el login y redirige al dashboard
  onLogin() {
    this.router.navigate(['/dashboard']); // Redirige al dashboard
  }
}
