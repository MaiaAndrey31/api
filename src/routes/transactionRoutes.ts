import { Router } from 'express';

import { TransactionController } from '../controllers/transactionsController';
import {
  createTransactionSchema,
  getDashboardSchema,
  getFinancialEvolutionSchema,
  indexTransactionSchema,
} from '../dtos/transactionsDto';
import { TransactionFactory } from '../factories/transactionsFactory';
import { ParamsType, validator } from '../middleware/validatorMiddleware';

export const transactionsRoutes = Router();

const controller = new TransactionController(
  TransactionFactory.getServiceInstance(),
);

transactionsRoutes.post(
  '/dashboard',
  validator({
    schema: createTransactionSchema,
    type: ParamsType.BODY,
  }),
  controller.create,
);

transactionsRoutes.get(
  '/',
  validator({
    schema: indexTransactionSchema,
    type: ParamsType.QUERY,
  }),
  controller.index,
);

transactionsRoutes.get(
  '/dashboard',
  validator({
    schema: getDashboardSchema,
    type: ParamsType.QUERY,
  }),
  controller.getDashboard,
);
transactionsRoutes.get(
  '/financial-evolution',
  validator({
    schema: getFinancialEvolutionSchema,
    type: ParamsType.QUERY,
  }),
  controller.getFinancialEvolution,
);
