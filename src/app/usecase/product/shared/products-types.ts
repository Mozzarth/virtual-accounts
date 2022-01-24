export enum ProductsTypesEnum {
    COUPON = 1,
    CREDENTIALS = 2
}

export interface IProductsTypes {
    [id: string]: {
        nombre: string,
        codigo: ProductsTypesEnum,
    }
}

export const ProductsTypes: IProductsTypes = {
    COUPON: {
        codigo: ProductsTypesEnum.COUPON,
        nombre: "Cupon"
    },
    CREDENTIALS: {
        codigo: ProductsTypesEnum.CREDENTIALS,
        nombre: "Credenciales"
    }
}
