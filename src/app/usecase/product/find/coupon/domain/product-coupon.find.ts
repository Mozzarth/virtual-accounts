import { Uuid } from "../../../../../shared/domain/valueobjects/uuid";


export interface ICouponFind {
    coupon: string,
    description: string
}

export interface IProductCouponFind {
    byUserId(id: Uuid): Promise<ICouponFind[]>
}