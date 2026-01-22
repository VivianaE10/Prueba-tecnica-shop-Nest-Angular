import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post() // crear producto
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get() // obtener todos los productos
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id') // obtener un producto por id
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('name/:name') // obtener producto por nombre
  findByName(@Param('name') name: string) {
    //findByName(name) sí recibe un parámetro
    return this.productsService.findByName(name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
