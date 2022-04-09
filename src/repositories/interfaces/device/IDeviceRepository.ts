import Device from '../../../entities/Device'
import { IDeviceFindingCriterias } from './IDeviceFindingCriterias'

export interface IDeviceRepository {
    findOne(params: IDeviceFindingCriterias, includeRelations: boolean): Promise<Device | false>;
    createDevice(): Promise<Device | false>
}
