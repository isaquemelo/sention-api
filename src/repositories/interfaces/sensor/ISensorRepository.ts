import { Device } from '@prisma/client'

import Sensor from '../../../entities/Sensor'
import SensorData from '../../../entities/SensorData'

import { ISensorFindingCriterias } from './ISensorFindingCriterias'

export interface ISensorRepository {
    findOne(params: ISensorFindingCriterias): Promise<Sensor | false>;
    save(sensor: Sensor, deviceId: string): Promise<Sensor | false>;
    delete(sensorId: string): Promise<boolean>
    getData(sensorId: string, page: number, day: Date): Promise<SensorData[] | false>;
    saveData(sensorData: SensorData, sensorId: string): Promise<SensorData | false>;
}
