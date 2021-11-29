import { bussinesCreateController as crtlCrear } from '../controllers/bussinesunit/create/bussinescreate.controller'
import { businessCreateMidd } from '../controllers/bussinesunit/create/businesscreate.midd'
import { Router } from 'express'


const rt = Router()

rt.post("/business", businessCreateMidd(), crtlCrear.handle.bind(crtlCrear))

export { rt as businessRT }

