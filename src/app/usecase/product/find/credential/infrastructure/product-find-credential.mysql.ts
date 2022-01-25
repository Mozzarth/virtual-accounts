import { ICredentialFind, IProductCredentialFind } from "../domain/product-credential.find";
import { connectionMySql } from "../../../../../shared/persistence/connection.mysql";
import { SqlConnection } from "../../../../../shared/persistence/IConnection";
import { Uuid } from "../../../../../shared/domain/valueobjects/uuid";
import { RowDataPacket } from "mysql2/promise";




export class ProductFindCredentialMysql implements IProductCredentialFind {

    constructor(private readonly provider: SqlConnection) { }

    async byUserId(id: Uuid): Promise<ICredentialFind[]> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query<RowDataPacket[][]>(`
                select 
                    b.user,
                    b.password,
                    a.description
                from products a join
                     productsTypeCredential b 
                     on BIN_TO_UUID(a.userCreate) = ? and a.idProduct = b.idProduct;`, [id.toString()]);
            const result: any = data[0]
            return result
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }

}
const productFindCredentialMysql = new ProductFindCredentialMysql(connectionMySql)
export { productFindCredentialMysql }