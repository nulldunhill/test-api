import {Request, Response} from "express";
import * as categoryService from "../services/category";
import {Category} from "../models/category";
import * as productService from "../services/product";

export const add = async (req: Request, res: Response) => {
    let category: Category;
    try {
        category = req.body;
    } catch (e) {
        return res.sendStatus(400);
    }

    await categoryService.add(category);

    return res.sendStatus(200);
};

export const update = async (req: Request, res: Response) => {
    let category: Category;
    try {
        category = req.body;
    } catch (e) {
        return res.sendStatus(400);
    }

    try {
        await categoryService.update(category);
    } catch (e) {
        return res.sendStatus(404);
    }

    return res.sendStatus(200);
};

export const remove = async (req: Request, res: Response) => {
    let categoryId: number;
    try {
        categoryId = parseInt(req.params.id)
    } catch (e) {
        return res.sendStatus(400);
    }

    try {
        await categoryService.remove(categoryId);
    } catch (e) {
        return res.sendStatus(404);
    }

    return res.sendStatus(200);
};

export const getAllJoinProducts = async (req: Request, res: Response) => {
    const result = await categoryService.getAllJoinProducts();
    return res.status(200).send(result);
};

export const getAllWithCount = async (req: Request, res: Response) => {
    const result = await categoryService.getAllWithCount();
    return res.status(200).send(result);
};