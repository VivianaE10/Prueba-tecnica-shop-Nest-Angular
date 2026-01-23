//crear la entidad para que tymeORM pueda mappear la tabla products

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity('products') //mapea la entidad Products con la tabla products
export class Product {
  @PrimaryGeneratedColumn() // genera el id automaticamente y se autoincrementa
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number;

  @Column({ default: true })
  is_active: boolean; // para no borrar productos, solo desactivarlos

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category; // referencia la columna FK en la tabla

  @Column()
  category_id: number; // IMportante 👀columna FK para la relación con Category
}
