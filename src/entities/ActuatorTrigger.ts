import actuatorActions from "./enums/actuatorActions";
import logicOperators from "./enums/logicOperators";

export default class ActuatorTrigger {
    constructor(
        private id: string, private name: string, private action: actuatorActions,
        private logicOperator: logicOperators,
        private value: number, private description: string) {

    }
}
