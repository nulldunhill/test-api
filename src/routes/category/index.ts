import express from 'express';

import {add, update, remove, getAllJoinProducts, getAllWithCount} from "../../controllers/category";

export const router = express.Router();
router.post('/', add);
router.put('/', update);
router.delete('/:id', remove);

// Получение списка товаров сгруппированных по категориям и подкатегориям
router.get('/getAllJoinProducts', getAllJoinProducts);
// Получение списка всех активных категорий (с подсчетом количества товара в каждой категории)
router.get('/getAllWithCount', getAllWithCount);