import { IProductsTypes, ProductsTypes } from "../../shared/products-types";


export class ProductFindService {

    async findTypes(): Promise<IProductsTypes> {
        return Promise.resolve(ProductsTypes)
    }



}

const productFindService = new ProductFindService()
export { productFindService }