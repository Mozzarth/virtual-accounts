import { validRouterExpressValidator } from "../../../shared/middleware/express-validator.midd";
import { body, header } from "express-validator";


export function userRegisterMidd() {
    return [
        //  email: string; password: string
        header("authorization").exists().isJWT(),
        body("email").exists().isString(),
        body("password").exists().isString(),
        // body("profile").exists().isInt({ min: 0 }),
        body("nombre").exists().isString().isLength({ min: 2 }),
        body("numberPhone").exists().isInt({ min: 9}),
        // body("observacion").exists().isString(),
        body("keyReferred").exists().isString(),
        validRouterExpressValidator
    ]
}