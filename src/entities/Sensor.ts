import SensorData from "./SensorData";

export default class Sensor {
    id: string
    name: string
    type: string
    port: number | object
    createdAt?: Date

    constructor(props: Sensor) {
        // Sensor data will be fetched on demmamnd
    }
}
