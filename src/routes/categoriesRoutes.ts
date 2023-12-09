import { Router } from 'express';

import { CategoriesController } from '../controllers/categoriesController';
import { createCategorySchema } from '../dtos/categoriesDto';
import { CategoriesFactory } from '../factories/categoryFactory';
import { ParamsType, validator } from '../middleware/validatorMiddleware';

export const categoriesRoutes = Router();

const controller = new CategoriesController(
  CategoriesFactory.getServiceInstance(),
);

categoriesRoutes.get('/', controller.index);

categoriesRoutes.post(
  '/',
  validator({
    schema: createCategorySchema,
    type: ParamsType.BODY,
  }),
  controller.create,
);
