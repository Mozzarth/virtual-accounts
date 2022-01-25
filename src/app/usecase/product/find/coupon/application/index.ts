import { keyAppUseCase } from "../../../../../shared/guard/application/guard-app"
import { productFindCouponMyslq } from "../infrastructure/product-find-coupon.mysql"
import { ProductCouponFindService } from "./product-coupon.find"




const productFindCouponService = new ProductCouponFindService(
    keyAppUseCase,
    productFindCouponMyslq)
export { productFindCouponService }