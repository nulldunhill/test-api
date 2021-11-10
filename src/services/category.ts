import DB from "../db";
import {Category} from "../models/category";

export const add = async (category: Category) => {
    const db = DB.getInstance();
    const res = await db.query("INSERT INTO category (name, parentId) VALUES ($1, $2) RETURNING id;", [category.name, category.parentId]);
    return res.rows[0].id;
};

export const update = async (category: Category) => {
    const db = DB.getInstance();
    const res = await db.query("UPDATE category SET name = $2 WHERE id = $1;", [category.id, category.name]);
};

export const remove = async (id: number) => {
    const db = DB.getInstance();
    const res = await db.query("DELETE FROM category WHERE id = $1;", [id]);
};

export const getAllJoinProducts = async () => {
    const db = DB.getInstance();
    const res = await db.query("SELECT category.id AS category_id, category.name AS category_name, " +
        "category.parentId AS category_parent_id, product.id AS product_id, product.name AS product_name FROM product " +
        "INNER JOIN category ON category.id = product.categoryId ORDER BY category.parentId DESC;");
    const categoriesProducts: any[] = [];
    for (let element of res.rows) {
        if (element.category_parent_id == null) {
            let categoryIndex = categoriesProducts.findIndex((categoryProducts) => categoryProducts.id === element.category_id);
            if (categoryIndex !== -1) {
                categoriesProducts[categoryIndex].products.push({
                    id: element.product_id,
                    name: element.product_name,
                });
            } else {
                categoriesProducts.push({
                    id: element.category_id,
                    name: element.category_name,
                    children: null,
                    products: [{
                        id: element.product_id,
                        name: element.product_name,
                    }]
                });
            }
        } else {
            for (let categoryProducts of categoriesProducts) {
                if (categoryProducts.id == element.category_parent_id) {
                    if (categoryProducts.children == null) {
                        categoryProducts.children = [{
                            id: element.category_id,
                            name: element.category_name,
                            children: null,
                            products: [{
                                id: element.product_id,
                                name: element.product_name,
                            }]
                        }];
                    } else {
                        categoryProducts.children.push({
                            id: element.category_id,
                            name: element.category_name,
                            children: null,
                            products: [{
                                id: element.product_id,
                                name: element.product_name,
                            }]
                        });
                    }
                    break;
                }
                if (categoryProducts.children != null) {
                    for (let child of categoryProducts.children) {
                        if (child.id == element.category_parent_id) {
                            if (child.children == null) {
                                child.children = [{
                                    id: element.category_id,
                                    name: element.category_name,
                                    children: null,
                                    products: [{
                                        id: element.product_id,
                                        name: element.product_name,
                                    }]
                                }];
                            } else {
                                child.children.push({
                                    id: element.category_id,
                                    name: element.category_name,
                                    children: null,
                                    products: [{
                                        id: element.product_id,
                                        name: element.product_name,
                                    }]
                                });
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
    return categoriesProducts;
}

export const getAllWithCount = async () => {
    const db = DB.getInstance();
    const res = await db.query("SELECT category.id, category.name, COUNT(*) AS products_number FROM category " +
        "RIGHT OUTER JOIN product ON product.categoryId = category.id GROUP BY category.id;");
    return res.rows;
}