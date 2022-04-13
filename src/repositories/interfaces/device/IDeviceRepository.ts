import Device from '../../../entities/Device'
import { IDeviceFindingCriterias } from './IDeviceFindingCriterias'

export interface IDeviceRepository {
    findOne(params: IDeviceFindingCriterias): Promise<Device | false>;
    findOneWithRelations(params: IDeviceFindingCriterias): Promise<Device | false>;
    createDevice(): Promise<Device | false>
}
