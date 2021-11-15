import { Router } from 'express'
import { userRT } from './user.routes'


const router = Router()

router.use(userRT)

export { router }