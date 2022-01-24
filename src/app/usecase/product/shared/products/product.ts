import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { ProductsTypesEnum } from "../products-types";


export type paramsProduct = {
    id?: Uuid;
    description: string;
    type: ProductsTypesEnum;
}

export abstract class Product {

    public readonly id: Uuid;
    public readonly description: string;
    public readonly type: ProductsTypesEnum;

    constructor(params: paramsProduct) {
        this.id = params.id == undefined ? Uuid.random() : params.id;
        this.description = params.description,
        this.type = params.type
    }

}