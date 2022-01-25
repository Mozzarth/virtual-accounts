import { productFindService, ProductFindService } from '../../../../app/usecase/product/find/shared/application/product.find';
import { Request, Response, NextFunction } from 'express';

class ProductFindController {


    constructor(
        private readonly service: ProductFindService
    ) { }

    async types(req: Request, res: Response, next: NextFunction) {
        try {
            const types = await this.service.findTypes();
            return res.status(200).json(types);
        } catch (error) {
            next(error);
        }
    }
}

const productFindController = new ProductFindController(productFindService)
export { productFindController };
