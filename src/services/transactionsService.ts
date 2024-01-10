import { StatusCodes } from 'http-status-codes';

import { CategoriesRepository } from '../database/repositories/categoriesRepository';
import { TransactionRepository } from '../database/repositories/transactionRepository';
import {
  CreateTransactionDTO,
  indexTransactionsDTO,
} from '../dtos/transactionsDto';
import { Transaction } from '../entities/transaction.entity';
import { AppError } from '../errors/appError';

export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async create({
    amount,
    categoryId,
    date,
    title,
    type,
  }: CreateTransactionDTO): Promise<Transaction> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Category not found', StatusCodes.NOT_FOUND);
    }
    const transaction = new Transaction({
      title,
      type,
      date,
      amount,
      category,
    });

    const createdTransaction =
      await this.transactionRepository.create(transaction);

    return createdTransaction;
  }

  async index(filters: indexTransactionsDTO): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.index(filters);

    return transactions;
  }
}
