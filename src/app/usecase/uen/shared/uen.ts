import { Uuid } from "../../../shared/domain/valueobjects/uuid";

interface IUenPrimitive {
    id: string;
    name: string
}
type parameters = {
    id?: Uuid;
    name: string
};

export class BusinesUnit {
    
    public readonly id: Uuid;
    public readonly name : string
    
    constructor( params : parameters    ){
        this.id = params.id == undefined ? Uuid.random() : params.id;
        this.name = params.name
    }

    toPrimitives() : IUenPrimitive{
        return {
            id : this.id.toString(),
            name : this.name
        }
    }
}