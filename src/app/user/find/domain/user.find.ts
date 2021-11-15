import { EmailAddres } from "../../../shared/domain/valueobjects/email/emailaddres";
import { Uuid } from "../../../shared/domain/valueobjects/uuid";
import { User } from "../../shared/user";

export interface IUserFind {
    idUser: string,
    email: string,
    profile: number,
    name: string,
    numberPhone: number,
    observacion: string
    myTopUser : string
    password: string,
    created: Date,
    userCreate: string,
    userUpdate: string | null,
    updateAt: Date | null,
}


export interface IUserFindRepository {
    all(): Promise<IUserFind[]>
    myUsers(currentUser: User): Promise<IUserFind[]>
    root(): Promise<IUserFind | undefined>
    byId(id: Uuid): Promise<IUserFind | undefined>
    byEmail(email: EmailAddres): Promise<IUserFind | undefined>
}