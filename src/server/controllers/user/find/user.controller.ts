import { userFindService, UserFindService } from "../../../../app/user/find/application/user.find";
import { Request, Response, NextFunction } from 'express'


class UserFindController {


    constructor(private readonly service: UserFindService) { }

    async all(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.headers.authorization || ""
            const data = await this.service.allUser(key)
            return res.status(200).json(data)
        } catch (error) {

        }
    }
    async byId(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.headers.authorization || ""
            const id = (req.params.id as string)
            const data = await this.service.byId(key,id)
            return res.status(200).json(data)
        } catch (error) {

        }
    }
    async byEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.headers.authorization || ""
            const email = req.body.email
            const data = await this.service.byEmail(key,email)
            return res.status(200).json(data)
        } catch (error) {

        }
    }
    async profiles(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.headers.authorization || ""
            const data = await this.service.profiles(key)
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }


}

const userFindController = new UserFindController(userFindService)
export { userFindController }
// userFindService