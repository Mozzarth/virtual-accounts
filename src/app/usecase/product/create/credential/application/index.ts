import { productCredendialCreateMysql } from "../infrastructure/product-credendial-create.mysql";
import { keyAppUseCase } from "../../../../../shared/guard/application/guard-app";
import { ProductCredentialCreateService } from "./product-credential.create";
import { encoderCrypto } from "../../../../../common/libs/encrypt/crypto";



const productCredentialCreate = new ProductCredentialCreateService(
    keyAppUseCase,
    encoderCrypto,
    productCredendialCreateMysql)
    
export { productCredentialCreate }