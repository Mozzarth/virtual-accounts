import { IProductoCreateRepository } from "../../shared/infrastructure/producto-create.repository";
import { SqlConnection } from "../../../../../shared/persistence/IConnection";
import { ProductCoupon } from "../../../shared/products/coupon";
import { User } from "../../../../user/shared/user";
import { connectionMySql } from "../../../../../shared/persistence/connection.mysql";


export class ProductCouponCreateMysl implements IProductoCreateRepository {

    constructor(private readonly provider: SqlConnection) { }

    async handle(producto: ProductCoupon, currentUser: User): Promise<void> {

        const connection1 = await this.provider.getConnection();
        const connection2 = await this.provider.getConnection();
        try {
            const statamentBusiness = `insert into products(idProduct, type,description, userCreate)
                                       values ( UUID_TO_BIN(?),?,?,UUID_TO_BIN(?) ); `;

            const statamentUser = `insert into productsTypeCoupon(idProduct,coupon)
                                   values ( UUID_TO_BIN(?),?);     `

            const { id, coupon, description, type } = producto.toPrimitives()
            const currentUserId = currentUser.id.value

            const paramsPaterns = [id, type, description, currentUserId]
            const paramsProduct = [id, coupon]
            await connection1.query(statamentBusiness, paramsPaterns)
            await connection2.query(statamentUser, paramsProduct)
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

const productCouponCreateMysl = new ProductCouponCreateMysl(connectionMySql)
export { productCouponCreateMysl }