import { CategoriesRepository } from '../database/repositories/categoriesRepository';
import { TransactionRepository } from '../database/repositories/transactionRepossitory';
import { CategoryModel } from '../database/schemas/categorySchema';
import { TransactionModel } from '../database/schemas/transactionSchema';
import { TransactionService } from '../services/transactionsService';

export class TransactionFactory {
  private static TransactionService: TransactionService;

  static getServiceInstance() {
    if (this.TransactionService) {
      return this.TransactionService;
    }

    const repository = new TransactionRepository(TransactionModel);
    const categoriesRepository = new CategoriesRepository(CategoryModel);
    const service = new TransactionService(repository, categoriesRepository);

    this.TransactionService = service;

    return service;
  }
}
