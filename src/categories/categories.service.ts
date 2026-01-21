import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

//voy a inyetrale el repositorio de la entidad Category
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const Category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(Category); //guardo la nueva categoria en la base de datos
  }

  findAll() {
    return this.categoryRepository.find(); //devuelve todas las categorias
  }

  async findByName(name: string) {
    //metodo que busca categorias por nombre
    return this.categoryRepository.find({
      where: { name },
    });
  }

  // eliminar una categoria por id, solo si el header admin es true
  async remove(id: number, isAdmin: boolean): Promise<string> {
    // Validate admin header
    if (!isAdmin) {
      return 'Unauthorized, admin header required';
    }

    const result = await this.categoryRepository.delete(id);

    if (result.affected === 0) {
      return 'Category not found';
    }

    return 'Category deleted successfully';
  }
}
