import { StatusCodes } from 'http-status-codes';

import { CategoriesRepository } from '../database/repositories/categoriesRepository';
import { TransactionRepository } from '../database/repositories/transactionRepository';
import {
  CreateTransactionDTO,
  GetFinancialEvolutionDTO,
  getDashboardDTO,
  indexTransactionsDTO,
} from '../dtos/transactionsDto';
import { Balance } from '../entities/balance.entity';
import { Expense } from '../entities/expenses.entity';
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

  async getDashboard({
    beginDate,
    endDate,
  }: getDashboardDTO): Promise<{ balance: Balance; expenses: Expense[] }> {
    let [balance, expenses] = await Promise.all([
      this.transactionRepository.getBalance({
        beginDate,
        endDate,
      }),
      this.transactionRepository.getExpenses({
        beginDate,
        endDate,
      }),
    ]);

    if (!balance) {
      balance = new Balance({
        _id: null,
        incomes: 0,
        expenses: 0,
        balance: 0,
      });
    }
    return { balance, expenses };
  }

  async getFinancialEvolution({
    year,
  }: GetFinancialEvolutionDTO): Promise<Balance[]> {
    const financialEvolution =
      await this.transactionRepository.getFinancialEvolution({ year });
    return financialEvolution;
  }
}
