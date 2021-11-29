import { Uuid } from "../../../../shared/domain/valueobjects/uuid";


export type paramsProduct = {
    id?: Uuid;
    description: string;
}

export abstract class Product {

    public readonly id: Uuid;
    public readonly description: string;

    constructor(params: paramsProduct) {
        this.id = params.id == undefined ? Uuid.random() : params.id;
        this.description = params.description
    }

}