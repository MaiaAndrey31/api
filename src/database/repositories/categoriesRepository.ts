import { CategoryModel } from '../schemas/categorySchema';

export class CategoriesRepository {
  constructor(private model: typeof CategoryModel) { }
}
