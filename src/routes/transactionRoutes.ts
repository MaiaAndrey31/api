import { Router } from 'express';

import { TransactionController } from '../controllers/transactionsController';
import { createTransactionSchema } from '../dtos/transactionsDto';
import { TransactionFactory } from '../factories/transactionsFactory';
import { ParamsType, validator } from '../middleware/validatorMiddleware';

export const transactionsRoutes = Router();

const controller = new TransactionController(
  TransactionFactory.getServiceInstance(),
);

transactionsRoutes.post(
  '/',
  validator({
    schema: createTransactionSchema,
    type: ParamsType.BODY,
  }),
  controller.create,
);

transactionsRoutes.get('/', controller.index);
