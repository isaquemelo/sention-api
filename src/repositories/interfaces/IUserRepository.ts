import User from "../../entities/User";
import { IUserFindingCriterias } from "./IUserFindingCriterias";


export interface IUserRepository {
    findOne(params: IUserFindingCriterias): Promise<User | false>;
    save(user: User): Promise<User | false>;
}
