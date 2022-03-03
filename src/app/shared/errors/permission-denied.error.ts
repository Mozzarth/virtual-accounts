export class ErrorPermissionDenied extends Error {  
    constructor(){
        super("No tiene permitido realizar esta acción")
    }
}
