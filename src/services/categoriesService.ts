import { CategoriesRepository } from '../database/repositories/categoriesRepository';
import { CreateCategoryDto } from '../dtos/categoriesDto';
import { Category } from '../entities/category.entity';
export class CategoriesSevice {
  constructor(private CategoriesRepository: CategoriesRepository) {}
  async create({ title, color }: CreateCategoryDto): Promise<Category> {
    const category = new Category({
      title,
      color,
    });

    const createdCategory = await this.CategoriesRepository.create(category);

    return createdCategory;
  }
}
