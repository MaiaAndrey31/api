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

  async index(): Promise<Transaction[]> {
    const transaction = await this.model.find();

    const transactionMap = transaction.map((item) =>
      item.toObject<Transaction>(),
    );

    return transactionMap;
  }
}
