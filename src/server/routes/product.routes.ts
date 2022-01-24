import { productCredentialCreateController as pdCredentialCreate } from '../controllers/product/create/credential-create.controller';
import { productCouponCreaterepository as pdCouponCreate } from '../controllers/product/create/coupon-create.controller';
import { Router } from 'express';
import { productFindController as pdFindController } from '../controllers/product/find/product.controller';



const rt = Router();

//Create Product
rt.post("/product/coupon", pdCouponCreate.handle.bind(pdCouponCreate))
rt.post("/product/credential",pdCredentialCreate.handle.bind(pdCredentialCreate))

// Find Product
rt.get("/product/types", pdFindController.types.bind(pdFindController))


export { rt as productRT }