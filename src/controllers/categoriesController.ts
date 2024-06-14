import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { CreateCategoryDto } from '../dtos/categoriesDto';
import { CategoriesSevice } from '../services/categoriesService';
import { BodyRequest } from './types';

export class CategoriesController {
  constructor(private CategoriesService: CategoriesSevice) {}
  create = async (
    req: BodyRequest<CreateCategoryDto>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, color } = req.body;

      const result = await this.CategoriesService.create({ title, color });

      return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  };

  index = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.CategoriesService.index();

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  };
}
