export default class NotificationTrigger {
    id?: string
    name: string
    type: string
    logicOperator: string
    value: number
    content: string
    dataSource?: string

    constructor(props: NotificationTrigger) {
        Object.assign(this, props)
    }
}
