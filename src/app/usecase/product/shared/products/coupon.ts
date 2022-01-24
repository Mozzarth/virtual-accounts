import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { ProductsTypesEnum } from "../products-types";
import { Product } from "./product";

type paramsProductCoupon = {
    id?: Uuid,
    description: string,
    coupon: string
}

export class ProductCoupon extends Product {

    public readonly coupon: string


    constructor(params: paramsProductCoupon) {
        const { description, id } = params
        super({ id, description, type: ProductsTypesEnum.COUPON })
        this.coupon = params.coupon
    }

    toPrimitives() {
        return {
            type: this.type,
            coupon: this.coupon,
            id: this.id.toString(),
            description: this.description
        }
    }
}
