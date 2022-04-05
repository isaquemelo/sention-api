import { NotificationTrigger } from "@prisma/client";
import Device from "./Device";
import SensorData from "./SensorData";

export default class Sensor {
    id: string
    name: string
    type: string
    port: number | object
    data?: SensorData
    notificationTriggers?: NotificationTrigger[]
    device?: Device
    deviceId?: string
    createdAt?: Date
    updatedAt?: Date

    constructor(props: Sensor) {
        Object.assign(this, props)
    }
}
