import ActuatorTrigger from "./ActuatorTrigger";
import actuatorTypes from "./enums/actuatorTypes";

export default class Actuator {
    constructor(
        private id: string, private name: string, private type: actuatorTypes,
        private port: number, private triggers: ActuatorTrigger[], private createdAt?: Date) {
    }
}
