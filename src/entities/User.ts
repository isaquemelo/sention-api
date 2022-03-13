import Device from "./Device";

export default class User {
    constructor(
        private id: string, private name: string, private email: string,
        private password: string, private devices: Device[]) {

    }
}
