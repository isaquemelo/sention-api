import { NotificationTrigger } from "@prisma/client";
import Device from "./Device";
import SensorData from "./SensorData";

export default class Sensor {
    id: string
    name: string
    type: string
    port: number | object

    constructor(props: Sensor) {
        Object.assign(this, props)
    }
}
