import DB from "../db";
import {Product} from "../models/product";

export const add = async (product: Product) => {
    const db = DB.getInstance();
    const res = await db.query("INSERT INTO product (name, categoryId) VALUES ($1, $2) RETURNING id;", [product.name, product.categoryId]);
    return res.rows[0].id;
};

export const update = async (product: Product) => {
    const db = DB.getInstance();
    const res = await db.query("UPDATE product SET name = $2 WHERE id = $1;", [product.id, product.name]);
};

export const remove = async (id: number) => {
    const db = DB.getInstance();
    const res = await db.query("DELETE FROM product WHERE id = $1;", [id]);
};

export const getAllByCategory = async (id: number) => {
    const db = DB.getInstance();
    const res = await db.query("SELECT category.id AS category_id, category.name AS category_name," +
        "product.id AS product_id, product.name AS product_name FROM product " +
        "INNER JOIN category ON category.id = product.categoryId WHERE categoryId = $1;", [id]);
    if (res.rows.length == 0) return [];
    const categoryProducts = {
        id: res.rows[0].category_id,
        name: res.rows[0].category_name,
        products: [] as any
    };
    for (let element of res.rows) {
        categoryProducts.products.push({
            id: element.product_id,
            name: element.product_name
        });
    }
    return categoryProducts;
};