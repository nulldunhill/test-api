import {Request, Response} from "express";
import * as productService from "../services/product";
import {Product} from "../models/product";

export const add = (req: Request, res: Response) => {
    let product: Product;
    try {
        product = req.body;
    } catch (e) {
        return res.sendStatus(400);
    }

    productService.add(product);

    return res.sendStatus(200);
};

export const update = (req: Request, res: Response) => {
    let product: Product;
    try {
        product = req.body;
    } catch (e) {
        return res.sendStatus(400);
    }

    try {
        productService.update(product);
    } catch (e) {
        return res.sendStatus(404);
    }

    return res.sendStatus(200);
};

export const remove = (req: Request, res: Response) => {
    let productId: number;
    try {
        productId = parseInt(req.params.id)
    } catch (e) {
        return res.sendStatus(400);
    }

    try {
        productService.remove(productId);
    } catch (e) {
        return res.sendStatus(404);
    }

    return res.sendStatus(200);
};

export const getAllByCategory = (req: Request, res: Response) => {
    let categoryId: number;
    try {
        categoryId = parseInt(req.params.categoryId)
    } catch (e) {
        return res.sendStatus(400);
    }

    const result = productService.getAllByCategory(categoryId);
    return res.status(200).send(result);
};