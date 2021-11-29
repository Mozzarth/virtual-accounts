import { EmailAddres } from "../../../../shared/domain/valueobjects/email/emailaddres";
import { ErrorUserRootAlreadyExist } from "../../register/domain/user-exists.error";
import { IUserRootCreateRepository } from "../domain/user.create-root";
import { IEncript } from "../../../../common/libs/encrypt/IEncrypts";
import { IPayloadAPP } from "../../../../shared/domain/IPayloadAPP";
import { IUserFindRepository } from "../../find/domain/user.find";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { Profiles } from "../../shared/user.profiles";
import { IUserRootCreateDTO } from "./dto";
import { User } from "../../shared/user";




export class UserRootCreateService {

    constructor(
        private readonly repository: IUserRootCreateRepository,
        private readonly userFind: IUserFindRepository,
        private readonly encrypt: IEncript
    ) { }

    async handle(params: IUserRootCreateDTO) {
        try {
            const user = await this.buildUser(params)
            const currentUser: IPayloadAPP = { id: user.id.value }
            await this.repository.handle(user, currentUser)
            return user
        } catch (error) {
            throw error
        }
    }

    private async buildUser(params: IUserRootCreateDTO) {
        try {
            const email = new EmailAddres(params.email)
            const password = await this.encrypt.encrypt(params.password)
            const userRoot = await this.userFind.root()
            if (userRoot != undefined) throw new ErrorUserRootAlreadyExist()
            const id = Uuid.random()
            const keyReferred = ""
            const numberPhone = 0
            const name = "ROOT"
            const user = new User({ myTopUser: id, id, email, password, profile: Profiles.ROOT.codigo, name, numberPhone, observacion: "ROOT", keyReferred })
            return user
        } catch (error) {
            throw error
        }
    }

}


