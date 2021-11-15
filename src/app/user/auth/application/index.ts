import { encryptBcrypt } from "../../../common/libs/encrypt/encrypt.bcrypt"
import { keyAppUseCase } from "../../../shared/guard/application/guard-app"
import { userFindMysql } from "../../find/repository/user-find.mysql"
import { UserAuthentication } from "./user.auth"


const userAuthentication = new UserAuthentication(userFindMysql, keyAppUseCase, encryptBcrypt)
export { userAuthentication }