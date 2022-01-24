import { ProductCredentialCreateService } from "../../../../app/usecase/product/create/credential/application/product-credential.create";
import { Request, Response, NextFunction } from 'express'
import { productCredentialCreate } from "../../../../app/usecase/product/create/credential/application";


class ProductCredentialCreateController {


    constructor(private readonly service: ProductCredentialCreateService) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.headers.authorization || "";
            const { password, user, description } = req.body;
            const producto = await this.service.handle({ key, description, password, user });
            return res.status(200).json(producto)
        } catch (error) {
            next(error);
        }
    }

}

const productCredentialCreateController = new ProductCredentialCreateController(productCredentialCreate)
export { productCredentialCreateController }