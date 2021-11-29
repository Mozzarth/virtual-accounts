import { ProductCoupon } from "../../shared/products/coupon";
import { User } from "../../../user/shared/user";

export interface IProductCouponCreateRepository {
    handle(product: ProductCoupon,currentUser : User) :Promise<void>
}
