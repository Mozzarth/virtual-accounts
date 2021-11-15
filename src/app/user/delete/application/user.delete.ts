import { ErrorPermissionDenied } from "../../../shared/errors/permission-denied.error";
import { KeyAppService } from "../../../shared/guard/application/guard-app";
import { IUserFindRepository } from "../../find/domain/user.find";
import { Uuid } from "../../../shared/domain/valueobjects/uuid";
import { IUserDeleteRepository } from "../domain/user.create";
import { Profiles2 } from "../../shared/user.profiles";
import { User } from "../../shared/user";
import { IUserDeleteDTO } from "./dto";



export class UserDeleteService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IUserDeleteRepository,
        private readonly userFindRepo: IUserFindRepository
    ) { }

    async handle(key: string, params: IUserDeleteDTO) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            await this.permiso(currentUser)
            const id = new Uuid(params.id)
            const userToDelete = await this.userFindRepo.byId(id)
            if (userToDelete == undefined) return
            if (userToDelete.myTopUser == currentUser.id.value) await this.repository.handle(id, currentUser)
            return
        } catch (error) {
            throw error
        }
    }
    private async permiso(currentUser: User) {
        if (currentUser.profile == Profiles2.BUYER.codigo) throw new ErrorPermissionDenied()
        return
    }


}