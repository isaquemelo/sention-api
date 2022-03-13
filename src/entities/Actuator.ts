import ActuatorTrigger from "./ActuatorTrigger";
import actuatorTypes from "./enums/actuatorTypes";

export default class Actuator {
    id: string
    name: string
    type: actuatorTypes
    port: number
    triggers: ActuatorTrigger[]
    createdAt?: Date

    constructor(props: Actuator) {
    }
}
