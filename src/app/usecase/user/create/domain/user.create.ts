import { User } from "../../shared/user";


export interface IUserCreateRepository {
    handle(user: User, currentUser: User): Promise<void>
}