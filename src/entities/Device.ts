import Actuator from "./Actuator";
import Sensor from "./Sensor";

export default class Device {
    id: string;
    accessCode: string;
    sensors: Sensor[];
    actuators: Actuator[];
    createdAt?: Date;

    constructor(props: Device) {
        Object.assign(this, props)
    }
}
