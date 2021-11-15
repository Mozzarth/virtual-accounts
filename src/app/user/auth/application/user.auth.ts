import { UserNotExisteError as UserNotExistsError } from "../../shared/user-notexists.error";
import { EmailAddres } from "../../../shared/domain/valueobjects/email/emailaddres";
import { KeyAppService } from "../../../shared/guard/application/guard-app";
import { IUserFindRepository } from "../../find/domain/user.find";
import { IUserLoginDTO } from "./dto";
import { IEncript } from "../../../common/libs/encrypt/IEncrypts";
import { UserCredentialInvalid } from "../domain/user-invalidcredential.error";



export class UserAuthentication {

    constructor(
        private readonly repository: IUserFindRepository,
        private readonly decodedKeyAPP: KeyAppService,
        private readonly encrypt: IEncript
    ) { }


    async handle(params: IUserLoginDTO) {
        try {
            const { email, password } = params
            const emailAddres = new EmailAddres(email)
            const user = await this.repository.byEmail(emailAddres)
            if (user == undefined) throw new UserNotExistsError()
            const validCredential = await this.encrypt.compare(password, user.password)
            if (!validCredential) throw new UserCredentialInvalid()
            const key = await this.decodedKeyAPP.getKey({ id: user.idUser })
            return key
        } catch (error) {
            throw error
        }
    }

}