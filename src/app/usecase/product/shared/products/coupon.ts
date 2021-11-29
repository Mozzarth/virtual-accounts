import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { Product } from "./product";

type paramsProductCoupon = {
    id?: Uuid,
    description: string,
    coupon : string 
}

export class ProductCoupon extends Product {

    public readonly coupon :string

    constructor(params: paramsProductCoupon) {
        const { description,id } = params
        super({ id, description })
        this.coupon = params.coupon
    }
}