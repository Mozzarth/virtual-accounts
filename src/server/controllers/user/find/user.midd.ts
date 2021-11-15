import { validRouterExpressValidator } from "../../../shared/middleware/express-validator.midd";
import { body, header, param } from "express-validator";


export function userFindAllMidd() {
    return [
        header("authorization").exists().isJWT(),
        validRouterExpressValidator
    ]
}
export function userFindByIdMidd() {
    return [
        param("id").exists().isUUID(),
        header("authorization").exists().isJWT(),
        validRouterExpressValidator
    ]
}
export function userFindByEmailMidd() {
    return [
        body("email").exists().isString(),
        header("authorization").exists().isJWT(),
        validRouterExpressValidator
    ]
}

export function userProfilesMidd() {
    return [
        header("authorization").exists().isJWT(),
        validRouterExpressValidator
    ]
}