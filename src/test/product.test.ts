import {Category} from "../models/category";
import * as categoryService from "../services/category";
import {Product} from "../models/product";
import * as productService from "../services/product";


describe('Product', () => {
    describe('create, update, delete', () => {
        it('should create, update and remove a product', async () => {
            const category = {name: "Category 1"} as Category;
            const categoryId = await categoryService.add(category);
            console.log(`Category with id ${categoryId} created`);

            const product = {name: "Product 1", categoryId: categoryId} as Product;
            const productId = await productService.add(product);
            console.log(`Product with id ${productId} created`);

            await productService.remove(productId);
            console.log(`Product with id ${productId} removed`);

            await categoryService.remove(categoryId);
            console.log(`Category with id ${categoryId} removed`);
        });
    });
    describe('get all products in category', () => {
        it('should print all products in category', async () => {
            const categoryProducts = await productService.getAllByCategory(18);
            console.log(categoryProducts);
        });
    });
});