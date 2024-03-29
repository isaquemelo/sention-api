import Actuator from './Actuator'
import Sensor from './Sensor'

export default class Device {
    id: string
    name?: string | null
    accessCode: string
    sensors: Sensor[]
    actuators: Actuator[]
    userId?: string | null
    createdAt?: Date

    constructor(props: Device) {
        Object.assign(this, props)
    }
}
