import { User } from "../../../user/shared/user";
import { BusinesUnit } from "../../shared/uen";



export interface IBusinesUnitCreateRepository {
    handle(currentUser: User, userUen: User, businesUnit : BusinesUnit ) : Promise<void>
}