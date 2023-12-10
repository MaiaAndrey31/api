import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { CreateTransactionDTO } from '../dtos/transactionsDto';
import { TransactionService } from '../services/transactionsService';

export class TransactionController {
  constructor(private TransactionService: TransactionService) {}
  create = async (
    req: Request<unknown, unknown, CreateTransactionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, amount, categoryId, date, type } = req.body;

      const result = await this.TransactionService.create({
        title,
        amount,
        categoryId,
        date,
        type,
      });

      return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  };
}
