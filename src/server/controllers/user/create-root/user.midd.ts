import { validRouterExpressValidator } from "../../../shared/middleware/express-validator.midd";
import { body } from "express-validator";


export function userRootCreateMidd(){
    return [
        //  email: string; password: string
        body("email").exists().isString(),
        body("password").exists().isString(),
        validRouterExpressValidator
    ]
}