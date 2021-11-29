import { connectionMySql } from "../../../../shared/persistence/connection.mysql";
import { SqlConnection } from "../../../../shared/persistence/IConnection";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { IUserDeleteRepository } from "../domain/user.delete";
import { User } from "../../shared/user";



export class UserDeleteMysql implements IUserDeleteRepository {

    constructor(private readonly provider: SqlConnection) { }
    

    async byId(id: Uuid,currentUser : User): Promise<void> {
        const connection = await this.provider.getConnection();
        try {
            const statament = `update users set
                                active = 0,
                                updateAt = now(),
                                userUpdate =  UUID_TO_BIN(?)
                              where idUser = UUID_TO_BIN(?)`;
            await connection.query(statament, [currentUser.id.value,id.value])
        } catch (error) {
            throw error
        } finally {
            connection.end();
        }
    }
}
const userCreateMysql = new UserDeleteMysql(connectionMySql)
export { userCreateMysql }