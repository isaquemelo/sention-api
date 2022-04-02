import Device from "../../entities/Device";
import User from "../../entities/User";
import { IUserFindingCriterias } from "./IUserFindingCriterias";


export interface IUserRepository {
    findOne(params: IUserFindingCriterias): Promise<User | false>;
    save(user: User): Promise<User | false>;
    associateDeviceToUser(accessCode: string, userId: string): Promise<Device | false>;
}
