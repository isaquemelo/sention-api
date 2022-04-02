import Device from "../../../entities/Device";
import { IDeviceFindingCriterias } from "./IDeviceFindingCriterias";

export interface IDeviceRepository {
    findOne(params: IDeviceFindingCriterias): Promise<Device | false>;
    // associateDeviceToUser(accessCode: string, userId: string): Promise<Device | false>;
    // dissociateDevice(deviceId: string, userId: string): Promise<boolean>;
}
