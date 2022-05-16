import Device from "../../entities/Device"
import { IDeviceRepository } from "../../repositories/interfaces/device/IDeviceRepository"
import { IUserRepository } from "../../repositories/interfaces/user/IUserRepository"
import { IDeviceDTO } from "../interfaces/IDeviceDTO"

export default class UpdateDeviceUseCase {
    constructor(private userRepository: IUserRepository, private deviceRepository: IDeviceRepository) { }

    async execute(data: IDeviceDTO, deviceId: string, userId: string): Promise<Device | false> {

        const user = await this.userRepository.findOne({
            id: userId,

            devices:{
                some:{
                    id: deviceId
                }
            }
        })

        if (!user) return false

        return await this.deviceRepository.update(deviceId, data)
    }

}