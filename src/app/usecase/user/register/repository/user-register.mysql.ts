import { connectionMySql } from "../../../../shared/persistence/connection.mysql";
import { SqlConnection } from "../../../../shared/persistence/IConnection";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { IUserCreateRepository } from "../domain/user.create";
import { User } from "../../shared/user";



export class UserRegisterMysql implements IUserCreateRepository {

    constructor(private readonly provider: SqlConnection) { }

    async handle(user: User, currentUser: Uuid): Promise<void> {
        const connection = await this.provider.getConnection();
        try {
            const statament = `
                insert into users(idUser,idUen,email,password,profile,userCreate,name,numberPhone,observacion,myTopUser,keyReferred)
                values( UUID_TO_BIN(?),UUID_TO_BIN(?),?,?,?,UUID_TO_BIN(?),?,?,?,UUID_TO_BIN(?),?)`;
            const { id,idUen, email, password, profile,name,numberPhone,observacion,myTopUser, keyReferred} = user.toPrimitives()
            const params = [id,idUen, email, password, profile, currentUser.value, name, numberPhone, observacion,myTopUser,keyReferred]
            await connection.query(statament,params)
        } catch (error) {
            throw error
        } finally {
            connection.end();
        }
    }
}
const userCreateMysql = new UserRegisterMysql(connectionMySql)
export { userCreateMysql }