//el servico de categorias para crear categorias en el backend
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories'; // Cambia el puerto si tu backend usa otro

  constructor(private http: HttpClient) {}

  createCategory(data: { name: string; description?: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
