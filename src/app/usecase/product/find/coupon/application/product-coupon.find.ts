import { KeyAppService } from "../../../../../shared/guard/application/guard-app";
import { IProductCouponFind } from "../domain/product-coupon.find";


export class ProductCouponFindService {


    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IProductCouponFind) { }

    async findByTopUser(key: string) {
        try {
            const user = await this.decodedKeyAPP.decodedKey(key)
            const products = await this.repository.byUserId(user.myTopUser)
            return products
        } catch (error) {
            throw error
        }
    }
    async findMe(key: string) {
        try {
            const user = await this.decodedKeyAPP.decodedKey(key)
            const products = await this.repository.byUserId(user.id)
            return products
        } catch (error) {
            throw error
        }
    }
}
