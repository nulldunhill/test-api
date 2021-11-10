import express from 'express';
import {add, update, remove, getAllByCategory} from "../../controllers/product";

export const router = express.Router();

router.post('/', add);
router.put('/', update);
router.delete('/:id', remove);

// Получение списка активных товаров в конкретной категории (с подсчетом количества товара)
router.get('/getAllByCategory/:categoryId', getAllByCategory);