import { UserRootCreateService } from "../../../../app/user/create-root/application/user.create-root";
import { NextFunction, Request, Response } from "express";
import { IUserRootCreateDTO } from "../../../../app/user/create-root/application/dto";
import { userRootCreateService } from "../../../../app/user/create-root/application";


class UserCreateRootController {

    constructor(private readonly service: UserRootCreateService) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const params: IUserRootCreateDTO = { email: email, password: password }
            const data = await this.service.handle(params)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

}

const userCreateRootController = new UserCreateRootController(userRootCreateService)
export { userCreateRootController}
