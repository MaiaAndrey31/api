import { CategoriesRepository } from '../database/repositories/categoriesRepository';
import { CategoryModel } from '../database/schemas/categorySchema';
import { CategoriesSevice } from '../services/categoriesService';

export class CategoriesFactory {
  private static CategoriesSevice: CategoriesSevice;

  static getServiceInstance() {
    if (this.CategoriesSevice) {
      return this.CategoriesSevice;
    }

    const repository = new CategoriesRepository(CategoryModel);
    const service = new CategoriesSevice(repository);

    this.CategoriesSevice = service;

    return service;
  }
}
