import { UserDeleteService } from "../../../../app/user/delete/application/user.delete";
import { userDeleteService } from "../../../../app/user/delete/application";
import { NextFunction, Response, Request } from "express";


export class UserDeleteController {
    
    constructor(private readonly service: UserDeleteService) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.headers.authorization || ""
            const id = req.params.id
            await this.service.handle(key, { id })
            res.status(200).end()
        } catch (error) {
            next(error)
        }
    }
}


const userDeleteController = new UserDeleteController(userDeleteService)
export { userDeleteController }