// implemear el endpoint para las categorias

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Headers,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    // crear categoria
    return this.categoriesService.create(createCategoryDto);
  }

  @Get() // obtener todas las categorias
  findAll() {
    //find all  metodo que trae todas las categorias
    return this.categoriesService.findAll();
  }

  @Get('name/:name') // obtener una categoria por nombre
  findByName(@Param('name') name: string) {
    //findByName(name) sí recibe un parámetro
    return this.categoriesService.findByName(name);
  }

  //🔎delete segun el header de comporamiento  y pipes para verificar que el id sea un numero valido 🔎
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Headers('admin') admin: string, // headr es inforacion extra osea es el texto de admin
  ) {
    const isAdmin = admin === 'true'; // 👀convierto el string a booleano y si es true entonces se elimina si es false no se elimina
    return this.categoriesService.remove(id, isAdmin);
  }
}
