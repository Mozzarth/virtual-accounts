import { UserAuthentication } from "../../../../app/usecase/user/auth/application/user.auth";
import { userAuthentication } from "../../../../app/usecase/user/auth/application";
import { IUserLoginDTO } from "../../../../app/usecase/user/auth/application/dto";
import { NextFunction, Request, Response } from "express";


class UserLoginController {

    constructor(
        private readonly service: UserAuthentication,
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const params: IUserLoginDTO = { email, password }
            const data = await this.service.handle(params)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

}

const userLoginController = new UserLoginController(userAuthentication)
export { userLoginController }
