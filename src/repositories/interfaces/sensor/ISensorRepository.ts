import { Device } from '@prisma/client'
import NotificationTrigger from '../../../entities/NotificationTrigger';

import Sensor from '../../../entities/Sensor'
import SensorData from '../../../entities/SensorData'
import { ISensorDTO } from '../../../useCases/interfaces/ISensorDTO';

import { ISensorFindingCriterias } from './ISensorFindingCriterias'

export interface ISensorRepository {
    findOne(params: ISensorFindingCriterias): Promise<Sensor | false>;
    save(sensor: Sensor, deviceId: string): Promise<Sensor | false>;
    delete(sensorId: string): Promise<boolean>
    update(sensorId: string, body: ISensorDTO): Promise<Sensor | false>
    getData(sensorId: string, page: number, day: Date): Promise<SensorData[] | false>;
    saveData(sensorData: SensorData, sensorId: string): Promise<SensorData | false>;

    saveNotificationTrigger(notificationTrigger: NotificationTrigger, sensorId: string): Promise<NotificationTrigger | false>
    deleteNotificationTrigger(notificationTriggerId: string): Promise<boolean>
}
