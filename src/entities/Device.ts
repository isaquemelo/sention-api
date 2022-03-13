import Actuator from "./Actuator";
import Sensor from "./Sensor";

export default class Device {
    constructor(
        private id: string, private accessCode: string,
        private sensors: Sensor[], private actuators: Actuator[], private createdAt?: Date) {

    }
}
