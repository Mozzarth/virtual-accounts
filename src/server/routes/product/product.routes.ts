import { productFindController as pdFindController } from '../../controllers/product/find/product.controller';
import { Router } from 'express';



const rt = Router();
rt.get("/product/types", pdFindController.types.bind(pdFindController))
// rt.get("/products",)


export { rt as rtProductShared }