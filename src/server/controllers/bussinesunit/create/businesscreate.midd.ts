import { validRouterExpressValidator } from "../../../shared/middleware/express-validator.midd";
import { body, header } from "express-validator";


export function businessCreateMidd() {
    return [
        header("authorization").exists().isJWT(),
        //User
        body("user.email").exists().isString(),
        body("user.password").exists().isString(),
        body("user.nombre").exists().isString().isLength({ min: 2 }),
        body("user.numberPhone").exists().isInt({ min: 9 }),
        body("user.observacion").exists().isString(),
        //Business
        body("business.name").exists().isString().isLength({ min: 2 }),
        validRouterExpressValidator
    ]
}