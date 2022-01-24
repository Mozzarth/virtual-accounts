import { IProductoCreateRepository } from "../../shared/infrastructure/producto-create.repository";
import { KeyAppService } from "../../../../../shared/guard/application/guard-app";
import { ProductoCreate } from "../../shared/application/producto.create";
import { ProductCouponCreateDto } from "./product-couponl.create.dto";
import { ProductCoupon } from "../../../shared/products/coupon";




export class ProductCouponCreateService extends ProductoCreate<ProductCouponCreateDto> {


    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IProductoCreateRepository) {
        super();
    }

    async handle(params: ProductCouponCreateDto) {
        const { description,coupon, key } = params;
        const currentUser = await this.decodedKeyAPP.decodedKey(key);
        await this.permiso(currentUser);
        const productCoupon = new ProductCoupon({ description, coupon })
        await this.repository.handle(productCoupon,currentUser);
        return productCoupon
    }

}