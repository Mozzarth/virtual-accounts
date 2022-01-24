import { Product } from "../../../shared/products/product";
import { User } from "../../../../user/shared/user";


export interface IProductoCreateRepository {
    handle(producto: Product,currentUser : User): Promise<void>;
}