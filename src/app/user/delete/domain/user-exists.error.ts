


export class ErrorUserAlreadyExist extends Error {
    
    // public readonly name : string
    constructor(){
        super()
        // this.name = "ErrorUserAlreadyExist"
    }
}




// function ErrorUserRootAlreadyExist() {
//     this.constructor.prototype.__proto__ = Error.prototype
//     Error.captureStackTrace(this, this.constructor)
//     this.name = this.constructor.name
//     this.message = message
// }

class ErrorUserRootAlreadyExist extends Error {
    constructor(){
        
        super()
        console.log("Clase : "+ this.name)
    }
}


export { ErrorUserRootAlreadyExist}
