import { StatusCodes } from 'http-status-codes';

import { CategoriesRepository } from '../database/repositories/categoriesRepository';
import { CreateCategoryDto } from '../dtos/categoriesDto';
import { Category } from '../entities/category.entity';
import { AppError } from '../errors/appError';
export class CategoriesSevice {
  constructor(private CategoriesRepository: CategoriesRepository) {}
  async create({ title, color }: CreateCategoryDto): Promise<Category> {
    const foundCategory = await this.CategoriesRepository.findByTitle(title);

    if (foundCategory) {
      throw new AppError('Category already exists', StatusCodes.BAD_REQUEST);
    }
    const category = new Category({
      title,
      color,
    });

    const createdCategory = await this.CategoriesRepository.create(category);

    return createdCategory;
  }
}
