import ActuatorTrigger from "./ActuatorTrigger";
import actuatorTypes from "./enums/actuatorTypes";

export default class Actuator {
    id: string
    name: string
    type: string
    port: number
    triggers: ActuatorTrigger[]
    createdAt?: Date

    constructor(props: Actuator) {
    }
}
