import { Request, Response, NextFunction } from 'express';
import { productFindService, ProductFindService } from '../../../../app/usecase/product/find/application/product.find';

class ProductFindController {


    constructor(private readonly productService: ProductFindService) { }

    async types(req: Request, res: Response, next: NextFunction) {
        try {
            const types = await this.productService.findTypes();
            return res.status(200).json(types);
        } catch (error) {
            next(error);
        }
    }



}


const productFindController = new ProductFindController(productFindService)
export { productFindController };
