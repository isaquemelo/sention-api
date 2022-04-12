import NotificationTrigger from "./NotificationTrigger"

export default class Sensor {
    id?: string
    name: string
    type: string
    port: object
    notificationTriggers?: NotificationTrigger[]
    createdAt?: Date
    updatedAt?: Date

    constructor(props: Sensor) {
        Object.assign(this, props)
    }
}
