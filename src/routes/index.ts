import { Router } from 'express';

import { baseRoutes } from './base.route';
import { categoriesRoutes } from './categoriesRoutes';
import { transactionsRoutes } from './transactionRoutes';

export const routes = Router();

routes.use('/', baseRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/transactions', transactionsRoutes);
