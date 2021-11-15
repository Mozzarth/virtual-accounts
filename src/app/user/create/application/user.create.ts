import { ErrorUserAlreadyExist, ErrorUserRootAlreadyExist } from "../domain/user-exists.error";
import { ErrorPermissionDenied } from "../../../shared/errors/permission-denied.error";
import { EmailAddres } from "../../../shared/domain/valueobjects/email/emailaddres";
import { KeyAppService } from "../../../shared/guard/application/guard-app";
import { IEncript } from "../../../common/libs/encrypt/IEncrypts";
import { IUserFindRepository } from "../../find/domain/user.find";
import { IUserCreateRepository } from "../domain/user.create";
import { Profiles2 } from "../../shared/user.profiles";
import { User } from "../../shared/user";
import { IUserCreateDTO } from "./dto";
import { ADDRCONFIG } from "dns";
import { resourceUsage } from "process";


export class UserCreateService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IUserCreateRepository,
        private readonly userFind: IUserFindRepository,
        private readonly encrypt: IEncript
    ) { }

    async handle(key: string, params: IUserCreateDTO) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            
            await this.validProfile(params)
            await this.permiso(currentUser,params.profile)

            const user = await this.buildUser(params, currentUser)
            await this.repository.handle(user, currentUser)
            return user.toPrimitives()
        } catch (error) {
            throw error
        }
    }

    private async buildUser(params: IUserCreateDTO, currentUser: User) {
        const email = new EmailAddres(params.email)
        const password = await this.encrypt.encrypt(params.password)
        const userFind = await this.userFind.byEmail(email)
        if (userFind != undefined) throw new ErrorUserAlreadyExist()
        const { profile, nombre, numberPhone, observacion } = params
        const user = new User({ email, password, profile, name: nombre, numberPhone, observacion, myTopUser: currentUser.id })
        return user
    }

    private async permiso(currentUser: User, profileToCreate : number) {
        const profileCurrent = currentUser.profile
        const { ADMIN, BUYER, DISTRIBUTOR, ROOT } = Profiles2

        if (ROOT.codigo == profileCurrent && profileToCreate == ADMIN.codigo) return
        if (ADMIN.codigo == profileCurrent && profileToCreate == DISTRIBUTOR.codigo) return
        if (DISTRIBUTOR.codigo == profileCurrent && (profileToCreate == DISTRIBUTOR.codigo || profileToCreate == BUYER.codigo)) return
        throw new ErrorPermissionDenied()
    }
    private async validProfile(params: IUserCreateDTO) {
        if (params.profile == Profiles2.ROOT.codigo) throw new ErrorUserRootAlreadyExist()
        return
    }

}