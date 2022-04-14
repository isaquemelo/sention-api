export default class NotificationTrigger {
    id?: string
    name: string | null
    type: string
    logicOperator: string
    value: number
    content: string

    constructor(props: NotificationTrigger) {
        Object.assign(this, props)
     }
}
