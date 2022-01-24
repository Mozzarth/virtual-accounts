import { businessRT } from './business.routes'
import { productRT } from './product.routes'
import { userRT } from './user.routes'
import { Router } from 'express'


const router = Router()

router.use(userRT)
router.use(productRT)
router.use(businessRT)

export { router }