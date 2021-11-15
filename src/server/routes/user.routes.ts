import { userCreateRootController as ctrlCreateRoot } from '../controllers/user/create-root/user.controller'
import { userFindAllMidd, userFindByEmailMidd, userFindByIdMidd, userProfilesMidd } from '../controllers/user/find/user.midd'
import { userCreateController as ctrlCreate } from '../controllers/user/create/user.controller'
import { userDeleteController as ctrlDelete } from '../controllers/user/delete/user.controller'
import { userLoginController as ctrlLogin } from '../controllers/user/login/user.controller'
import { userFindController as ctrlFind } from '../controllers/user/find/user.controller'
import { userRootCreateMidd } from '../controllers/user/create-root/user.midd'
import { userLoginCreateMidd as userLoginMidd } from '../controllers/user/login/user.midd'
import { userDeleteMidd } from '../controllers/user/delete/user.midd'
import { userCreateMidd } from '../controllers/user/create/user.midd'
import { Router } from 'express'

const rt = Router()


rt.post("/userRoot", userRootCreateMidd(), ctrlCreateRoot.handle.bind(ctrlCreateRoot))
rt.post("/userAuth", userLoginMidd(), ctrlLogin.handle.bind(ctrlLogin))
rt.post("/user", userCreateMidd(), ctrlCreate.handle.bind(ctrlCreate))
rt.delete("/user/:id", userDeleteMidd(), ctrlDelete.handle.bind(ctrlDelete))

rt.get("/users", userFindAllMidd(), ctrlFind.all.bind(ctrlFind))
rt.get("/user/profiles", userProfilesMidd(), ctrlFind.profiles.bind(ctrlFind))

rt.get("/user/email", userFindByEmailMidd(), ctrlFind.byEmail.bind(ctrlFind))
rt.get("/user/:id", userFindByIdMidd(), ctrlFind.byId.bind(ctrlFind))

// userAuthentication

export { rt as userRT }