import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { Product } from "./product";

type paramsProductCredential = {
    id?: Uuid,
    description: string,

    user: string,
    password: string
}

export class ProductCredential extends Product {
    public readonly user: string
    public readonly password: string

    constructor(params: paramsProductCredential) {
        const { description, id } = params
        super({ id, description })
        this.password = params.password
        this.user = params.user
    }


}