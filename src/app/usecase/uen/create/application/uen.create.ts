import { ErrorPermissionDenied } from "../../../../shared/errors/permission-denied.error";
import { EmailAddres } from "../../../../shared/domain/valueobjects/email/emailaddres";
import { ErrorUserAlreadyExist } from "../../../user/delete/domain/user-exists.error";
import { KeyAppService } from "../../../../shared/guard/application/guard-app";
import { IUserFindRepository } from "../../../user/find/domain/user.find";
import { IBusinesUnitCreateRepository } from "../domain/busines.create";
import { IEncript } from "../../../../common/libs/encrypt/IEncrypts";
import { Profiles } from "../../../user/shared/user.profiles";
import { IUENCreate, IUenUserCreateDTO } from "./dto";
import { User } from "../../../user/shared/user";
import { BusinesUnit } from "../../shared/uen";




export class BusinesUnitCreateService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IBusinesUnitCreateRepository,
        private readonly userFind: IUserFindRepository,
        private readonly encrypt: IEncript) { }



    async handle(key: string, paramsUser: IUenUserCreateDTO, paramUen: IUENCreate) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            await this.canCreate(currentUser)
            const userUen = await this.buildUser(paramsUser, currentUser)
            const uen = await this.buildUen(paramUen)
            await this.repository.handle(currentUser, userUen, uen)
            return { user: userUen.toPrimitives(), business: uen.toPrimitives() }
        } catch (error) {
            throw error
        }
    }

    private async buildUser(params: IUenUserCreateDTO, currentUser: User) {
        const email = new EmailAddres(params.email)
        const password = await this.encrypt.encrypt(params.password)
        const userFind = await this.userFind.byEmail(email)
        if (userFind != undefined) throw new ErrorUserAlreadyExist()
        const { nombre, numberPhone, observacion } = params
        const profile = Profiles.UEN.codigo
        const prmUser = { email, password, profile, name: nombre, numberPhone, observacion, myTopUser: currentUser.id }
        const user = new User(prmUser)
        return user
    }

    private async buildUen(paramUen: IUENCreate) {
        const { name, } = paramUen
        const uen = new BusinesUnit({ name })
        return uen
    }
    private async canCreate(currentUser: User) {
        if (currentUser.profile != Profiles.ROOT.codigo) throw new ErrorPermissionDenied()
    }


}