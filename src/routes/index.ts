import {Express} from "express";
import * as categoryRoutes from "./category";
import * as productRoutes from "./product";

export = (app: Express) => {
    app.use('/api/category', categoryRoutes.router);
    app.use('/api/product', productRoutes.router);
}