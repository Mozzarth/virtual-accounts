import { rtBusiness } from './business.routes'
import { rtUser } from './user.routes'
import { rtProduct } from './product'
import { Router } from 'express'


const router = Router()

router.use(rtUser)
router.use(rtProduct)
router.use(rtBusiness)

export { router }