import { NotExisteError as UserNotExistsError } from "../../../../shared/errors/notexists.error";
import { EmailAddres } from "../../../../shared/domain/valueobjects/email/emailaddres";
import { UserCredentialInvalid } from "../domain/user-invalidcredential.error";
import { KeyAppService } from "../../../../shared/guard/application/guard-app";
import { IEncript } from "../../../../common/libs/encrypt/IEncrypts";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { IUserFindRepository } from "../../find/domain/user.find";
import { IUserLoginDTO } from "./dto";



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
            if (user == undefined) throw new UserNotExistsError("User not exists")
            const validCredential = await this.encrypt.compare(password, user.password)
            if (!validCredential) throw new UserCredentialInvalid()
            const key = await this.decodedKeyAPP.getKey({ id: user.idUser })
            const infoUser = await this.repository.byId(new Uuid(user.idUser))
            return { key, user: infoUser }
        } catch (error) {
            throw error
        }
    }

}