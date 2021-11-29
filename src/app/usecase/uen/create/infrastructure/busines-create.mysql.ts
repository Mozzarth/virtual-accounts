import { connectionMySql } from "../../../../shared/persistence/connection.mysql";
import { SqlConnection } from "../../../../shared/persistence/IConnection";
import { IBusinesUnitCreateRepository } from "../domain/busines.create";
import { User } from "../../../user/shared/user";
import { BusinesUnit } from "../../shared/uen";




export class BusinesUnitCreateMysql implements IBusinesUnitCreateRepository {

    constructor(private readonly provider: SqlConnection) { }


    async handle(currentUser: User, userUen: User, businesUnit: BusinesUnit): Promise<void> {
        const connection1 = await this.provider.getConnection();
        const connection2 = await this.provider.getConnection();
        try {
            const statamentBusiness = `insert into businessUnits(idUen, name, userCreate) 
                                       values ( UUID_TO_BIN(?),?,UUID_TO_BIN(?) ); `;
            const statamentUser = `insert into users(idUser,idUen,email,password,profile,userCreate,name,numberPhone,observacion,myTopUser,keyReferred)
                                   values ( UUID_TO_BIN(?),UUID_TO_BIN(?),?,?,?,UUID_TO_BIN(?),?,?,?,UUID_TO_BIN(?),?);     `

            const { email, myTopUser, numberPhone, observacion, profile, password,keyReferred } = userUen.toPrimitives()
            const { id, name } = businesUnit.toPrimitives()
            const currentUserId = currentUser.id.value

            const paramBusiness = [id, name, currentUserId]
            const paramUser = [userUen.id.value,businesUnit.id.value, email, password, profile, currentUserId, userUen.name, numberPhone, observacion, myTopUser,keyReferred]
            await connection1.query(statamentBusiness, paramBusiness)
            await connection2.query(statamentUser, paramUser)
        } catch (error) {
            await connection1.rollback()
            await connection2.rollback()
            throw error
        } finally {
            connection1.end();
            connection2.end();
        }
    }
}
const businesUnitCreateMysql = new BusinesUnitCreateMysql(connectionMySql)
export { businesUnitCreateMysql }