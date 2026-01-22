import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Crear producto Y asignar categoría
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { category_id, ...productData } = createProductDto;

    const category = await this.categoryRepository.findOne({
      where: { id: category_id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${category_id} not found`);
    }

    const product = this.productRepository.create({
      ...productData,
      category,
    });

    return this.productRepository.save(product);
  }

  // Obtener todos los productos con su categoría
  async findAll(): Promise<Product[]> {
    // Promise de un array de productos
    return this.productRepository.find(); // eager:true trae la categoría automáticamente si la configuraste así
  }

  // Obtener producto por id y su categoría (activo o inactivo)
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  // Obtener productos por nombre (busqueda parcial) y su categoría
  async findByName(name: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  // Eliminar producto por id y su categoría
  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    product.is_active = false; // 👀 como inactivo en lugar de eliminar definitivamente
    await this.productRepository.save(product);
  }
}
