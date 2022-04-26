export default class ActuatorTrigger {
    id?: string
    name: string
    action: string
    logicOperator: string
    value: number
    description: string
    sensorId: string
    dataSource?: string

    constructor(props: ActuatorTrigger) {
        Object.assign(this, props)
    }
}
