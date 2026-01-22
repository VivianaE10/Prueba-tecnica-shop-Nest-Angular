import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
  IsPositive,
  IsBoolean,
} from 'class-validator';

//descoradores para validar los datos de entrada
export class CreateProductDto {
  @IsString() //validacion obligatoria de string name
  name: string;

  @IsOptional() //descripcion es opcional
  @IsString() // debe ser string si se envia
  description?: string;

  @IsNumber() //debe ser numero price obligatorio
  @IsPositive() // mayor que 0
  price: number;

  @IsInt() //debe ser entero stock obligatorio
  @Min(0) // minimo 0
  stock: number;

  @IsOptional() // es opcional
  @IsBoolean() // debe ser booleano si se envia
  is_active?: boolean;

  @IsInt() // debe ser entero
  @IsPositive() // debe ser positivo
  category_id: number; // obligatorio debe existir en categorias
}
