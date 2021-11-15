import { IPayloadAPP } from "../../../shared/domain/IPayloadAPP";
import { User } from "../../shared/user";


export interface IUserRootCreateRepository {
    handle(user: User, currentUser: IPayloadAPP): Promise<void>
}