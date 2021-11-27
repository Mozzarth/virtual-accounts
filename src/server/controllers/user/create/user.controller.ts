import { UserCreateService } from "../../../../app/usecase/user/create/application/user.create";
import { IUserCreateDTO } from "../../../../app/usecase/user/create/application/dto";
import { userCreateService } from "../../../../app/usecase/user/create/application";
import { NextFunction, Response, Request } from "express";



export class UserCreateController {


    constructor(private readonly service: UserCreateService) { }


    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, profile, nombre, numberPhone, observacion } = req.body
            const key = req.headers.authorization || ""
            const params: IUserCreateDTO = { email, password, profile, nombre, numberPhone, observacion }
            const data = await this.service.handle(key, params)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}


const userCreateController = new UserCreateController(userCreateService)
export { userCreateController }