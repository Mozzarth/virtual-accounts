import { encryptBcrypt } from "../../../common/libs/encrypt/encrypt.bcrypt"
import { keyAppUseCase } from "../../../shared/guard/application/guard-app"
import { userFindMysql } from "../../find/repository/user-find.mysql"
import { userCreateMysql } from "../repository/user-create.mysql"
import { UserCreateService } from "./user.create"


const userCreateService = new UserCreateService(
    keyAppUseCase,
    userCreateMysql,
    userFindMysql,
    encryptBcrypt
)

export { userCreateService }