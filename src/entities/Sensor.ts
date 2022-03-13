import SensorData from "./SensorData";

export default class Sensor {
    constructor(
        private id: string, private name: string, private type: string,
        private port: number | object, private createdAt?: Date) {
        // Sensor data will be fetched on demmamnd
    }
}
