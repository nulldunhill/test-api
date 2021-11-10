import {Product} from "./product";

export class Category {
    readonly id?: number;
    readonly name: string;
    readonly parentId?: number;
}