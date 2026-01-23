//este servicio se encarga de manejar las operaciones relacionadas con los productos
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:3000/products'; // Cambia el puerto si tu backend usa otro

  constructor(private http: HttpClient) {}

  createProduct(data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    is_active?: boolean;
    category_id: number;
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
