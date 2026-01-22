export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
  is_active?: boolean;
  category_id: number; // obligatorio debe existir en categorias
}
