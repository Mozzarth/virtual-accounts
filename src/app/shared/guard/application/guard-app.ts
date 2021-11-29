import { userFindMysql } from "../../../usecase/user/find/repository/user-find.mysql"
import { IUserFindRepository } from "../../../usecase/user/find/domain/user.find"
import { EmailAddres } from "../../domain/valueobjects/email/emailaddres"
import { JwtRepository } from "../../../common/libs/encoder/encoder.jwt"
import { IEncoderAPP } from "../../../common/libs/encoder/IEncoder"
import { NotExisteError } from "../../errors/notexists.error"
import { IParamsUser, User } from "../../../usecase/user/shared/user"
import { IPayloadAPP } from "../../domain/IPayloadAPP"
import { Uuid } from "../../domain/valueobjects/uuid"

export class KeyAppService {

    constructor(
        private readonly provider: IEncoderAPP<IPayloadAPP>,
        private readonly repository: IUserFindRepository
    ) {
    }
    async getKey(payload: IPayloadAPP): Promise<string> {
        const key = this.provider.getKey(payload)
        return key
    }
    async decodedKey(key: string): Promise<User> {
       try {
           const payload = await this.provider.decodedKey(key)
           const id = new Uuid(payload.id)
           const user = await this.repository.byId(id)
           if (user == undefined) throw new NotExisteError("User not exists")
           const { name, profile, password, email, numberPhone, observacion, idUser, myTopUser, idUen } = user
        //    if (idUen == undefined) throw new Error("Error al identificar uen de un usuario")
           let idUen_ = idUen  ? new Uuid(idUen) : undefined
           const paramsUser: IParamsUser = {
               id: new Uuid(idUser), myTopUser: new Uuid(myTopUser), email: new EmailAddres(email),
               password, profile, name, numberPhone, observacion,
               keyReferred: user.keyReferred, idUen: idUen_
           }
           const currentUser = new User(paramsUser)
           return currentUser
       } catch (error) {
           throw error
       }
    }
}


const jwtRepository = new JwtRepository<IPayloadAPP>()
const keyAppUseCase = new KeyAppService(jwtRepository, userFindMysql)
export { keyAppUseCase }