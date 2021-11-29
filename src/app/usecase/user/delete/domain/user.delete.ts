import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { User } from "../../shared/user";

export interface IUserDeleteRepository {
    byId(id: Uuid, currentUser: User): Promise<void>
}