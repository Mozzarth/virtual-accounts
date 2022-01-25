import { connectionMySql } from "../../../../../shared/persistence/connection.mysql"
import { ICouponFind, IProductCouponFind } from "../domain/product-coupon.find"
import { SqlConnection } from "../../../../../shared/persistence/IConnection"
import { Uuid } from "../../../../../shared/domain/valueobjects/uuid"
import { RowDataPacket } from "mysql2/promise";



export class ProductFindCouponMyslq implements IProductCouponFind {

    constructor(private readonly provider: SqlConnection) { }

    async byUserId(id: Uuid): Promise<ICouponFind[]> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query<RowDataPacket[][]>(`
                select 
                    a.description,
                    b.coupon
                from products a join
                     productsTypeCoupon b 
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
const productFindCouponMyslq = new ProductFindCouponMyslq(connectionMySql)
export { productFindCouponMyslq }