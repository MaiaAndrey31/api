import { indexTransactionsDTO } from '../../dtos/transactionsDto';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionModel } from '../schemas/transactionSchema';

export class TransactionRepository {
  constructor(private model: typeof TransactionModel) {}

  async create({
    title,
    amount,
    date,
    type,
    category,
  }: Transaction): Promise<Transaction> {
    const createdTransaction = await this.model.create({
      title,
      amount,
      date,
      type,
      category,
    });

    return createdTransaction.toObject<Transaction>();
  }

  async index({
    title,
    categoryId,
    beginDate,
    endDate,
  }: indexTransactionsDTO): Promise<Transaction[]> {
    const transaction = await this.model.find({
      title: {
        $regex: title,
        options: 'i',
      },
      'category._id': categoryId,
      date: {
        $gte: beginDate,
        $lte: endDate,
      },
    });

    const transactionMap = transaction.map((item) =>
      item.toObject<Transaction>(),
    );

    return transactionMap;
  }
}
