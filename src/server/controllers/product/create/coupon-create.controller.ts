import { ProductCouponCreateService } from "../../../../app/usecase/product/create/coupon/application/product-coupon.create";
import { productCouponCreate } from "../../../../app/usecase/product/create/coupon/application";
import { Request, Response, NextFunction } from "express";



class ProductCouponCreateController {


    constructor(private readonly service: ProductCouponCreateService) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.headers.authorization || "";
            const { coupon, description } = req.body;
            const producto = await this.service.handle({ key, coupon, description });
            return res.status(200).json(producto)
        } catch (error) {
            next(error);
        }
    }

}

const productCouponCreateController = new ProductCouponCreateController(productCouponCreate)
export { productCouponCreateController }