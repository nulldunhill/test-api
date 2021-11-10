//import assert from "assert";
import * as categoryService from "../services/category";
import {Category} from "../models/category";

describe('Category', () => {
    describe('create, update, delete', () => {
        it('should create, update and remove one category', async () => {
            const category = {name: "Category 1"} as Category;
            const categoryId = await categoryService.add(category);
            console.log(`Category with id ${categoryId} created`);

            const updatedCategory = {id: categoryId, name: "Category 321"} as Category;
            await categoryService.update(updatedCategory);
            console.log(`Category with id ${categoryId} updated`);

            await categoryService.remove(categoryId);
            console.log(`Category with id ${categoryId} removed`);
        });
        it('should create, update and remove some connected categories', async () => {
            const category1 = {name: "Category 1"} as Category;
            const category1Id = await categoryService.add(category1);
            console.log(`Category with id ${category1Id} created`);

            const category2 = {name: "Category 2", parentId: category1Id} as Category;
            const category2Id = await categoryService.add(category2);
            console.log(`Category with id ${category2Id} created`);

            const category3 = {name: "Category 3", parentId: category2Id} as Category;
            const category3Id = await categoryService.add(category3);
            console.log(`Category with id ${category3Id} created`);

            const updatedCategory3 = {id: category3Id, name: "Category 321", parentId: category1Id} as Category;
            await categoryService.update(updatedCategory3);
            console.log(`Category with id ${category3Id} updated`);

            await categoryService.remove(category3Id);
            console.log(`Category with id ${category3Id} removed`);
            await categoryService.remove(category2Id);
            console.log(`Category with id ${category2Id} removed`);
            await categoryService.remove(category1Id);
            console.log(`Category with id ${category1Id} removed`);
        });
    });
    describe('get all categories with products count', () => {
        it('should print all categories whith products count', async () => {
            const categories = await categoryService.getAllWithCount();
            console.log(categories);
        });
    });
    describe('get all categories with products', () => {
        it('should print all categories whith products', async () => {
            const categories = await categoryService.getAllJoinProducts();
            console.log(JSON.stringify(categories));
        });
    });
});