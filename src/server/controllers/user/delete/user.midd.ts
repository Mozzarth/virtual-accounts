import { validRouterExpressValidator } from "../../../shared/middleware/express-validator.midd";
import { header, param } from "express-validator";


export function userDeleteMidd() {
    return [
        //  email: string; password: string
        header("authorization").exists().isJWT(),
        param("id").exists().isString(),
        validRouterExpressValidator
    ]
}