import { validationResult, ValidationError, Result } from "express-validator";
import { Request, Response, NextFunction } from "express";

export function validRouterExpressValidator(req: Request, res: Response, next: NextFunction) {
    try {
        const _error = validationResult(req);
        if (!_error.isEmpty()) {
            return res.status(400).json({ message: "Bad request", errors: getMensajes(_error) })
        }
        next();
    } catch (error) {
        next(error);
    }
}

function getMensajes(error: Result<ValidationError>) {
    const arrayObjetos = Object.values(error.mapped());
    const arrayErrores = arrayObjetos.map((objetoError) => {
        return `${objetoError.param} - ${objetoError.msg} (${objetoError.location}) `;
    });
    return arrayErrores
}
