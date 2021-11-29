import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { User } from "../../shared/user";


export interface IUserCreateRepository {
    handle(user: User, currentUser: Uuid): Promise<void>
}