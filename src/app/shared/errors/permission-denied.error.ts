export class ErrorPermissionDenied extends Error {  
    constructor(message ?: string){
        super(message ? message : "No tiene permitido realizar esta acción")
    }
}
