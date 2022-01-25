import { ProductCouponFindService } from '../../../../app/usecase/product/find/coupon/application/product-coupon.find';
import { productFindCouponService } from '../../../../app/usecase/product/find/coupon/application';
import { Request, Response, NextFunction } from 'express';

class ProductCouponFindController {


    constructor(
        private readonly service: ProductCouponFindService
    ) { }

    async findMe(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.headers.authorization as string;
            const data = await this.service.findMe(key);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
    async findByTopUser(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.headers.authorization as string;
            const data = await this.service.findByTopUser(key);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}

const productCouponFindController = new ProductCouponFindController(productFindCouponService)
export { productCouponFindController };
