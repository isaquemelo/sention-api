import NotificationTrigger from "./NotificationTrigger"

export default class Sensor {
    id?: string
    name: string
    type: string
    port: object
    notificationTriggers?: NotificationTrigger[]
    createdAt?: string
    updatedAt?: string

    constructor(props: Sensor) {
        Object.assign(this, props)
    }
}
