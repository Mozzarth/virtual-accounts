import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { ProductsTypesEnum } from "../products-types";
import { Product } from "./product";

type paramsProductCredential = {

    id?: Uuid,
    description: string,

    user: string,
    password: string
}

export class ProductCredentials extends Product {

    public readonly user: string
    public readonly password: string

    constructor(params: paramsProductCredential) {
        const { description, id } = params
        super({ id, description, type: ProductsTypesEnum.CREDENTIALS })
        this.password = params.password
        this.user = params.user
    }

    toPrimitives() {
        return {
            type: this.type,
            user: this.user,
            password: this.password,
            id: this.id.toString(),
            description: this.description,
        }
    }


}