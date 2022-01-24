import { KeyAppService, keyAppUseCase } from "../../../../shared/guard/application/guard-app";
// import { ErrorPermissionDenied } from "../../../../shared/errors/permission-denied.error";
import { EmailAddres } from "../../../../shared/domain/valueobjects/email/emailaddres";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { userFindMysql } from "../repository/user-find.mysql";
import { IUserFindRepository } from "../domain/user.find";
import { Profiles } from "../../shared/user.profiles";




export class UserFindService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IUserFindRepository) { }

    async byId(key: string, id: string) {
        try {
            await this.getCurrentUser(key)
            const uuid = new Uuid(id)
            const user = await this.repository.byId(uuid)
            return user
        } catch (error) {
            throw error
        }
    }
    async byEmail(key: string, email: string) {
        try {
            await this.getCurrentUser(key)
            const emailAdress = new EmailAddres(email)
            const user = await this.repository.byEmail(emailAdress)
            if (user) {
                let userPrimitives = user
                // delete userPrimitives.password
                return userPrimitives
            }
            return undefined
        } catch (error) {
            throw error
        }
    }
    async allUser(key: string) {
        try {
            const currentUser = await this.getCurrentUser(key)
            if (currentUser.profile == Profiles.ROOT.codigo) {
                const user = await this.repository.all()
                return user
            }
            if (currentUser.profile == Profiles.UEN.codigo) {
                const user = await this.repository.byUEN(currentUser.idUen.value)
                return user
            }
            const user = await this.repository.myUsers(currentUser)
            return user
        } catch (error) {
            throw error
        }
    }
    async profiles(key: string) {
        try {
            await this.getCurrentUser(key)
            return Profiles
        } catch (error) {
            throw error
        }
    }

    private async getCurrentUser(key: string) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            return currentUser
        } catch (error) {
            throw error
        }
    }

}

const userFindService = new UserFindService(keyAppUseCase, userFindMysql)
export { userFindService }