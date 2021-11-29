import { UserRegisterService as UserRegisterService } from "../../../../app/usecase/user/register/application/user.register";
import { IUserRegisterDTO } from "../../../../app/usecase/user/register/application/dto";
import { userCreateService } from "../../../../app/usecase/user/register/application";
import { NextFunction, Response, Request } from "express";



export class UserCreateController {


    constructor(private readonly service: UserRegisterService) { }


    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, nombre, numberPhone } = req.body
            const key = req.body.keyReferred
            const params: IUserRegisterDTO = { email, password, nombre, numberPhone }
            const data = await this.service.handle(key, params)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}


const userCreateController = new UserCreateController(userCreateService)
export { userCreateController }