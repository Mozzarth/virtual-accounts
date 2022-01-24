import { productCouponCreateMysl } from "../infrastructure/product-create-coupon.mysql";
import { keyAppUseCase } from "../../../../../shared/guard/application/guard-app";
import { ProductCouponCreateService } from "./product-coupon.create";


const productCouponCreate = new ProductCouponCreateService(keyAppUseCase, productCouponCreateMysl);
export { productCouponCreate };