import { productFindCredentialMysql } from "../infrastructure/product-find-credential.mysql"
import { keyAppUseCase } from "../../../../../shared/guard/application/guard-app"
import { encoderCrypto } from "../../../../../common/libs/encrypt/crypto"
import { ProductCredentialFindService } from "./product.credential.find"


const productCredentialFindService = new ProductCredentialFindService(
    encoderCrypto,
    keyAppUseCase,
    productFindCredentialMysql
)
export { productCredentialFindService }