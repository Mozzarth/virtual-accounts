import { Uuid } from "../../../../../shared/domain/valueobjects/uuid";


export interface ICredentialFind {
    user : string,
    password : string,
    description : string
}

export interface IProductCredentialFind {
    byUserId(id: Uuid): Promise<ICredentialFind[]>
}