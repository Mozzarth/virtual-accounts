import { BusinesUnitCreateService } from "../../../../app/usecase/uen/create/application/uen.create";
import { businesUnitCreateService } from "../../../../app/usecase/uen/create/application";
import { NextFunction, Request, Response } from "express";



class BussinesCreateController {

    constructor(private readonly service: BusinesUnitCreateService) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.headers.authorization || ""

            const { businessUnits, email, nombre, numberPhone, observacion, password } = req.body.user
            const { name } = req.body.business
            const user = { businessUnits, email, nombre, numberPhone, observacion, password }
            const business = { name }
            const data = await this.service.handle(key, user, business)
            return res.status(200).send(data)
        } catch (error) {
            next(error)
        }
    }
}

const bussinesCreateController = new BussinesCreateController(businesUnitCreateService)
export { bussinesCreateController }