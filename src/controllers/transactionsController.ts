import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import {
  CreateTransactionDTO,
  getDashboardDTO,
  indexTransactionsDTO,
} from '../dtos/transactionsDto';
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

  index = async (
    req: Request<unknown, unknown, unknown, indexTransactionsDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, categoryId, beginDate, endDate } = req.query;
      const result = await this.TransactionService.index({
        title,
        categoryId,
        beginDate,
        endDate,
      });

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  };

  getDashboard = async (
    req: Request<unknown, unknown, unknown, getDashboardDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { beginDate, endDate } = req.query;
      const result = await this.TransactionService.getDashboard({
        beginDate,
        endDate,
      });

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  };
}
