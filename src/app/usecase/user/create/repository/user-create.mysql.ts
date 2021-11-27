import { connectionMySql } from "../../../../shared/persistence/connection.mysql";
import { SqlConnection } from "../../../../shared/persistence/IConnection";
import { IUserCreateRepository } from "../domain/user.create";
import { User } from "../../shared/user";



export class UserCreateMysql implements IUserCreateRepository {

    constructor(private readonly provider: SqlConnection) { }

    async handle(user: User, currentUser: User): Promise<void> {
        const connection = await this.provider.getConnection();
        try {
            const statament = `insert into users(idUser,email,password,profile,userCreate,name,numberPhone,observacion,myTopUser)
                                values( UUID_TO_BIN(?),?,?,?,UUID_TO_BIN(?),?,?,?,UUID_TO_BIN(?))`;
            const { id, email, password, profile,name,numberPhone,observacion,myTopUser } = user.toPrimitives()
            const params = [id, email, password, profile, currentUser.id.value, name, numberPhone, observacion,myTopUser]
            await connection.query(statament,params)
        } catch (error) {
            throw error
        } finally {
            connection.end();
        }
    }
}
const userCreateMysql = new UserCreateMysql(connectionMySql)
export { userCreateMysql }