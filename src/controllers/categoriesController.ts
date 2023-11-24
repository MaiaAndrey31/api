import { Request, Response } from "express";
import { CategoriesSevice } from "../services/categoriesService";

export class CategoriesController {

    async create(req: Request, res: Response) {
        const service = new CategoriesSevice()

        const result = await service.create()


        return res.status(201).json(result)

    }
}