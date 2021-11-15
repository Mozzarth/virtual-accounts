import { keyAppUseCase } from "../../../shared/guard/application/guard-app"
import { userFindMysql } from "../../find/repository/user-find.mysql"
import { userCreateMysql } from "../repository/user-delete.mysql"
import { UserDeleteService } from "./user.delete"


const userDeleteService = new UserDeleteService(keyAppUseCase, userCreateMysql, userFindMysql)

export { userDeleteService }