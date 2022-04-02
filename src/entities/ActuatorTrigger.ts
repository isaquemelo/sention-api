import actuatorActions from "./enums/actuatorActions";
import logicOperators from "./enums/logicOperators";

export default class ActuatorTrigger {
    id: string
    name: string
    action: string
    logicOperator: string
    value: number
    description: string

    constructor(props: ActuatorTrigger) { }
}
