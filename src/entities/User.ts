import Device from "./Device";

export default class User {
    id?: string
    name: string
    email: string
    password: string
    devices: Device[]

    constructor(props: User) {
        Object.assign(this, props)
    }
}
