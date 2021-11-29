import { ProductCredential } from "../../shared/products/credentials";
import { User } from "../../../user/shared/user";

export interface IProductCredentialCreateRepository {
    handle(product: ProductCredential, currentUser: User): Promise<void>
}