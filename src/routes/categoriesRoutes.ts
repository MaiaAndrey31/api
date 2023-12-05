import { Router } from 'express';

import { CategoriesController } from '../controllers/categoriesController';
import { createCategorySchema } from '../dtos/categoriesDto';
import { ParamsType, validator } from '../middleware/validatorMiddleware';

export const categoriesRoutes = Router();

const controller = new CategoriesController();

categoriesRoutes.post(
  '/',
  validator({
    schema: createCategorySchema,
    type: ParamsType.BODY,
  }),
  controller.create,
);
