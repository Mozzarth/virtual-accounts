import { IProductoCreateRepository } from "../../shared/infrastructure/producto-create.repository";
import { connectionMySql } from "../../../../../shared/persistence/connection.mysql";
import { SqlConnection } from "../../../../../shared/persistence/IConnection";
import { ProductCredentials } from "../../../shared/products/credentials";
import { User } from "../../../../user/shared/user";


export class ProductCredendialCreateMysql implements IProductoCreateRepository {

    constructor(private readonly provider: SqlConnection) { }

    async handle(producto: ProductCredentials, currentUser: User): Promise<void> {
        const connection1 = await this.provider.getConnection();
        const connection2 = await this.provider.getConnection();
        try {
            const statamenParent = `insert into products(idProduct, type,description, userCreate)
                                       values ( UUID_TO_BIN(?),?,?,UUID_TO_BIN(?) );`;

            const statamentProduct = `insert into productsTypeCredential(idProduct,user,password)
                                   values ( UUID_TO_BIN(?),?,?);`;

            const { id, user, password, description, type } = producto.toPrimitives()
            const currentUserId = currentUser.id.value

            const paramsPaterns = [id, type, description, currentUserId]
            const paramsProduct = [id, user, password]
            await connection1.query(statamenParent, paramsPaterns)
            await connection2.query(statamentProduct, paramsProduct)
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

const productCredendialCreateMysql = new ProductCredendialCreateMysql(connectionMySql)

export { productCredendialCreateMysql }