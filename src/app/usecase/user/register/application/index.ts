import { encryptBcrypt } from "../../../../common/libs/encrypt/encrypt.bcrypt"
import { userFindMysql } from "../../find/repository/user-find.mysql"
import { userCreateMysql } from "../repository/user-register.mysql"
import { UserRegisterService } from "./user.register"


const userCreateService = new UserRegisterService(
    userCreateMysql,
    userFindMysql,
    encryptBcrypt
)

export { userCreateService }