import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { CategoriesRepository } from '../database/repositories/categoriesRepository';
import { CategoryModel } from '../database/schemas/categorySchema';
import { CreateCategoryDto } from '../dtos/categoriesDto';
import { CategoriesSevice } from '../services/categoriesService';

export class CategoriesController {
  async create(
    req: Request<unknown, unknown, CreateCategoryDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { title, color } = req.body;
      const repository = new CategoriesRepository(CategoryModel);
      const service = new CategoriesSevice(repository);

      const result = await service.create({ title, color });

      return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }
}
