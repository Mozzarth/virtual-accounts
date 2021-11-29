import { EmailAddres } from "../../../shared/domain/valueobjects/email/emailaddres";
import { Uuid } from "../../../shared/domain/valueobjects/uuid";
import { UserProfileInvalid } from "./user-profileinvalid";
import { ProfilesValid } from "./user.profiles";


export type IParamsUser = {
    id?: Uuid;
    idUen?: Uuid;
    name: string;
    myTopUser: Uuid;
    profile: number;
    password: string;
    email: EmailAddres;
    observacion: string,
    numberPhone: number,
    keyReferred?: string
};
interface IUserPrimitive {
    id: string;
    email: string;
    password: string;
    profile: number,
    numberPhone: number,
    name: string,
    observacion: string,
    myTopUser: string,
    keyReferred: string,
    idUen : string
}

export class User {

    public readonly id: Uuid;
    public readonly email: EmailAddres;
    public readonly name: string;
    public readonly profile: number // Todo verificar profile
    public readonly password: string;
    public readonly observacion: string;
    public readonly myTopUser: Uuid;
    public readonly numberPhone: number;
    public readonly keyReferred: string;
    public readonly idUen : Uuid
    // public readonly observaciones: string

    constructor(params: IParamsUser) {
        this.id = params.id == undefined ? Uuid.random() : params.id;
        this.email = params.email;
        this.name = params.name
        this.profile = params.profile;
        this.password = params.password;
        this.numberPhone = params.numberPhone //TODO Validar que sea un numero (VOB)
        this.observacion = params.observacion
        this.myTopUser = params.myTopUser
        this.idUen = params.idUen == undefined ? Uuid.random() : params.idUen
        this.keyReferred = params.keyReferred || `${this.name.toLowerCase().replace(" ", "").trim()}-${Uuid.random()}`
        if (!ProfilesValid(this.profile)) throw new UserProfileInvalid()
    }
    toPrimitives(): IUserPrimitive {
        return {
            id: this.id.value,
            name: this.name,
            profile: this.profile,
            password: this.password,
            email: this.email.toString(),
            numberPhone: this.numberPhone,
            observacion: this.observacion,
            myTopUser: this.myTopUser.value,
            keyReferred: this.keyReferred,
            idUen : this.idUen.toString()
        };
    }
}