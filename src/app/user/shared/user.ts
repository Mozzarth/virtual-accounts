import { EmailAddres } from "../../shared/domain/valueobjects/email/emailaddres";
import { Uuid } from "../../shared/domain/valueobjects/uuid";
import { UserProfileInvalid } from "./user-profileinvalid";
import { ProfilesValid } from "./user.profiles";


type parameters = {
    id?: Uuid;
    profile: number;
    email: EmailAddres;
    password: string;
    numberPhone: number,
    name: string,
    observacion: string,
    myTopUser: Uuid
};
interface IUserPrimitive {
    id: string;
    email: string;
    password?: string;
    profile: number,
    numberPhone: number,
    name: string,
    observacion: string,
    myTopUser: string
}

export class User {

    public readonly id: Uuid;
    public readonly email: EmailAddres;
    public readonly nombre: string;
    public readonly profile: number // Todo verificar profile
    public readonly password: string;
    public readonly observacion: string;
    public readonly myTopUser: Uuid;
    public readonly numberPhone: number;
    // public readonly observaciones: string

    constructor(params: parameters) {
        this.id = params.id == undefined ? Uuid.random() : params.id;
        this.email = params.email;
        this.nombre = params.name
        this.profile = params.profile;
        this.password = params.password;
        this.numberPhone = params.numberPhone //TODO Validar que sea un numero (VOB)
        this.observacion = params.observacion
        this.myTopUser = params.myTopUser
        if (!ProfilesValid(this.profile)) throw new UserProfileInvalid()
    }
    toPrimitives(): IUserPrimitive {
        return {
            id: this.id.value,
            name: this.nombre,
            profile: this.profile,
            password: this.password,
            email: this.email.toString(),
            numberPhone: this.numberPhone,
            observacion: this.observacion,
            myTopUser: this.myTopUser.value
        };
    }
}