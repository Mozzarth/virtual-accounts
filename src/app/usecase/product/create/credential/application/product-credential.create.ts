import { IProductoCreateRepository } from "../../shared/infrastructure/producto-create.repository";
import { KeyAppService } from "../../../../../shared/guard/application/guard-app";
import { ProductCredentialCreateDto } from "./product-credential.create.dto";
import { ProductoCreate } from "../../shared/application/producto.create";
import { ProductCredentials } from "../../../shared/products/credentials";
import { IEncriptDecrypt } from "../../../../../common/libs/encrypt/IEncrypt.decript";



export class ProductCredentialCreateService extends ProductoCreate<ProductCredentialCreateDto> {


    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly encryptDecript: IEncriptDecrypt,
        private readonly repository: IProductoCreateRepository) {
        super();
    }

    async handle(params: ProductCredentialCreateDto) {
        const { description, user, key } = params;
        const currentUser = await this.decodedKeyAPP.decodedKey(key);
        await this.permiso(currentUser);
        const password = await this.encryptDecript.encrypt(params.password);
        const productCredential = new ProductCredentials({ description, password, user })
        await this.repository.handle(productCredential, currentUser);
        return productCredential;
    }

}
