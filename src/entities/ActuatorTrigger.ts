import actuatorActions from "./enums/actuatorActions";
import logicOperators from "./enums/logicOperators";

export default class ActuatorTrigger {
    id: string
    name: string
    action: actuatorActions
    logicOperator: logicOperators
    value: number
    description: string

    constructor(props: ActuatorTrigger) { }
}
