// import { ErrorUserRootAlreadyExist } from "../../../app/usecase/user/delete/domain/user-exists.error"
import { Request, Response, NextFunction} from "express"

export function handleErrorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
   //TODO Realizar los respectivos cambios para crear un diccionaio de errores

    // console.log(error instanceof ErrorUserRootAlreadyExist)
    // console.log(error.name)
    // console.log(error.message)
    // console.log(error.stack)
    console.log(error)
    return res.status(500).send(JSON.stringify(error))
}
