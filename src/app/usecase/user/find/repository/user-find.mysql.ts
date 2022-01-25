import { EmailAddres } from "../../../../shared/domain/valueobjects/email/emailaddres";
import { connectionMySql } from "../../../../shared/persistence/connection.mysql";
import { SqlConnection } from "../../../../shared/persistence/IConnection";
import { IUserFind, IUserFindRepository } from "../domain/user.find";
import { Uuid } from "../../../../shared/domain/valueobjects/uuid";
import { Profiles } from "../../shared/user.profiles";
import { RowDataPacket } from "mysql2";
import { User } from "../../shared/user";


export class UserFindMysql implements IUserFindRepository {

    private readonly statament: string = `
                        SELECT
                            BIN_TO_UUID(idUSer) as idUser,
                            BIN_TO_UUID(idUen) as idUen,
                            name,
                            numberPhone,
                            observacion,
                            keyReferred,
                            email,
                            password,
                            profile,
                            created,
                            BIN_TO_UUID(myTopUser) as myTopUser,
                            if(isnull(userCreate)=1,null,BIN_TO_UUID(userCreate)) as userCreate,
                            if(isnull(userUpdate)=1,null,BIN_TO_UUID(userUpdate)) as userUpdate,
                            updateAt
                        FROM users`

    constructor(private readonly provider: SqlConnection) { }


    async byUEN(businessCode: string): Promise<IUserFind[]> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query<RowDataPacket[][]>(`
                        ${this.statament}
                        where active = 1
                              and BIN_TO_UUID(idUen) = ?;`, [businessCode])
            const result: any = data[0]
            return result
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }



    async byKeyReferred(key: string): Promise<IUserFind | undefined> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query<RowDataPacket[][]>(`
                        ${this.statament}
                        where active = 1
                              and keyReferred = ?;`, [key])
            const result: any = data[0][0]
            return (result as IUserFind | undefined)
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }


    async myUsers(currentUser: User): Promise<IUserFind[]> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query(`
                        ${this.statament}
                        where active = 1
                              and BIN_TO_UUID(myTopUser) = ?;`, [currentUser.id.value])
            // console.log(data)
            const result = (data[0] as any)
            return result
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }


    async all(): Promise<IUserFind[]> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query(`${this.statament} where active = 1;`, [])
            const result = (data[0] as any)
            return result
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }
    async root(): Promise<IUserFind | undefined> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection
                .query<RowDataPacket[][]>(`${this.statament} where profile = ? and active = 1;`,
                    [Profiles.ROOT.codigo])
            const result: any = data[0][0]
            return (result as IUserFind | undefined)
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }
    async byId(id: Uuid): Promise<IUserFind | undefined> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query<RowDataPacket[][]>(`
                        ${this.statament} where idUSer = UUID_TO_BIN(?) and active = 1;`, [id.toString()])
            const result: any = data[0][0]
            // console.log({result})
            return (result as IUserFind | undefined)
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }

    async byEmail(email: EmailAddres): Promise<IUserFind | undefined> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query<RowDataPacket[][]>(`
            ${this.statament} 
            where email = ? and active = 1;`, [email.toString()])
            const result: any = data[0][0]
            return (result as IUserFind | undefined)
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }

}

const userFindMysql = new UserFindMysql(connectionMySql)
export { userFindMysql }