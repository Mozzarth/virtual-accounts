import { IEncriptDecrypt } from "../../../../../common/libs/encrypt/IEncrypt.decript";
import { KeyAppService } from "../../../../../shared/guard/application/guard-app";
import { IProductCredentialFind } from "../domain/product-credential.find";


export class ProductCredentialFindService {


    constructor(
        private readonly decrypt: IEncriptDecrypt,
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IProductCredentialFind) { }


    async findByTopUser(key: string) {
        try {
            const user = await this.decodedKeyAPP.decodedKey(key)
            const products = await this.repository.byUserId(user.myTopUser)
            const result = products.map(async p => {
                return { ...p, password: await this.decrypt.decrypt(p.password) }
            })
            return Promise.all(result)
        } catch (error) {
            throw error
        }
    }
    async findMe(key: string) {
        try {
            const user = await this.decodedKeyAPP.decodedKey(key)
            const products = await this.repository.byUserId(user.id)
            const result = products.map(async p => {
                return { ...p, password: await this.decrypt.decrypt(p.password) }
            })
            return Promise.all(result)
        } catch (error) {
            throw error
        }
    }
}

