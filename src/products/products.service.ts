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

  // Obtener todos los productos con su categoría y estado
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] }); // incluye la relación con categoría y si esta activo
  }

  // Obtener producto por id y su categoría
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, is_active: true }, //me filtra por el id y que esté activo o inactivo
      relations: ['category'], // incluye la relación con categoría para devolverla también y mostarla en el get
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  // Obtener productos por nombre (busqueda parcial) y su categoría
  async findByName(name: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { name: ILike(`%${name}%`) },
      relations: ['category'], // incluye la relación con categoría para devolverla también
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
