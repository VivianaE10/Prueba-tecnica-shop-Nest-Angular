import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()//validacion obligatoria de string name
  @MaxLength(100)// longitud maxima 100 caracteres
  name: string;

  @IsOptional() //descripcion es opcional
  @IsString() // debe ser string si se envia
  description?: string;
}
