export default class SensorData {
    id?: string
    data: number | object
    createdAt?: Date

    constructor(props: SensorData) {
        Object.assign(this, props)
    }
}
