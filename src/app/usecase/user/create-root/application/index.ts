import { userCreateRootMysql } from "../infrastructure/user-create-root.mysql"
import { encryptBcrypt } from "../../../../common/libs/encrypt/encrypt.bcrypt"
import { userFindMysql } from "../../find/repository/user-find.mysql"
import { UserRootCreateService } from "./user.create-root"


const userRootCreateService = new UserRootCreateService(userCreateRootMysql, userFindMysql, encryptBcrypt)
export { userRootCreateService }