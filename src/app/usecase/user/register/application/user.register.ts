import { EmailAddres } from "../../../../shared/domain/valueobjects/email/emailaddres";
import { NotExisteError } from "../../../../../app/shared/errors/notexists.error";
import { IUserFind, IUserFindRepository } from "../../find/domain/user.find";
import { IEncript } from "../../../../common/libs/encrypt/IEncrypts";
import { ErrorUserAlreadyExist } from "../domain/user-exists.error";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { ProfilesNextCreate } from "../../shared/user.profiles";
import { IUserCreateRepository } from "../domain/user.create";
import { IUserRegisterDTO as IUserCreateDTO } from "./dto";
import { User } from "../../shared/user";


export class UserRegisterService {

    constructor(
        private readonly repository: IUserCreateRepository,
        private readonly userFind: IUserFindRepository,
        private readonly encrypt: IEncript
    ) { }

    async handle(key: string, params: IUserCreateDTO) {
        try {
            const userReferied = await this.userFind.byKeyReferred(key)
            if (userReferied == undefined) throw new NotExisteError("Referido no existe")
            const user = await this.buildUser(params, userReferied)
            await this.repository.handle(user, new Uuid(userReferied.idUser))
            return user.toPrimitives()
        } catch (error) {
            throw error
        }
    }

    private async buildUser(params: IUserCreateDTO, userReferied: IUserFind) {
        const email = new EmailAddres(params.email)
        const password = await this.encrypt.encrypt(params.password)
        const userFind = await this.userFind.byEmail(email)
        if (userFind != undefined) throw new ErrorUserAlreadyExist()
        if (userReferied.idUen == null) throw new Error("Referido no se encuentra asociado a una UEN")
        const { nombre, numberPhone } = params
        const profile = ProfilesNextCreate(userReferied.profile)
        const myTopUser = new Uuid(userReferied.idUser)
        const idUen = new Uuid(userReferied.idUen)
        const observacion = ""
        const user = new User({ email, password, profile, name: nombre, numberPhone, observacion, myTopUser, idUen })
        return user
    }
}