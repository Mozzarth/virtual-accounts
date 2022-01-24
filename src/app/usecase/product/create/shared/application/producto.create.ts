import { ErrorPermissionDenied } from "../../../../../shared/errors/permission-denied.error";
import { Profiles } from "../../../../user/shared/user.profiles";
import { User } from "../../../../user/shared/user";
import { Product } from "../../../shared/products/product";



export abstract class ProductoCreate<T> {


    abstract handle(params: T): Promise<Product>;

    protected async permiso(user: User) {
        if (user.profile === Profiles.PROVEEDOR.codigo) return
        if (user.profile === Profiles.SRESELLER.codigo) return
        throw new ErrorPermissionDenied("No tiene permisos para crear productos");
    }

}