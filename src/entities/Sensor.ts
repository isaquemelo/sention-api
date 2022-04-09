export default class Sensor {
    id?: string
    name: string
    type: string
    port: object

    constructor(props: Sensor) {
        Object.assign(this, props)
    }
}
