import Device from '../../../entities/Device'
import { IDeviceDTO } from '../../../useCases/interfaces/IDeviceDTO';
import { IDeviceFindingCriterias } from './IDeviceFindingCriterias'

export interface IDeviceRepository {
    findOne(params: IDeviceFindingCriterias): Promise<Device | false>;
    findOneWithRelations(params: IDeviceFindingCriterias): Promise<Device | false>;
    createDevice(): Promise<Device | false>
    update(deviceId: string, device: IDeviceDTO): Promise<Device | false>
}
