import { ProductCredentialFindService } from '../../../../app/usecase/product/find/credential/application/product.credential.find';
import { productCredentialFindService } from '../../../../app/usecase/product/find/credential/application';
import { Request, Response, NextFunction } from 'express';

class ProductFindController {


    constructor(
        private readonly service: ProductCredentialFindService
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

const productFindCredentialController = new ProductFindController(productCredentialFindService)
export { productFindCredentialController };
