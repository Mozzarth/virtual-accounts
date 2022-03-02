

export class ErrorUserAlreadyExist extends Error {
    
    // public readonly name : string
    constructor(){
        super("Usuario ya existe")
        // this.name = "ErrorUserAlreadyExist"
    }
}


export class ErrorUserRootAlreadyExist extends Error {
    constructor(message?: string) {
        super(message); // 'Error' breaks prototype chain here
        // this.name = 'CustomError';
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}