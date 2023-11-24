import { Category } from "../entities/category.entity";

export class CategoriesSevice{

    async create(): Promise<Category>{
        const category = new Category({
            title: 'Example',
            color: '#FF56F1',
        });

        return category


    } 
}