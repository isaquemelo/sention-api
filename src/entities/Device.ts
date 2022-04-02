import Actuator from "./Actuator";
import Sensor from "./Sensor";
import User from "./User";

export default class Device {
    id: string;
    accessCode: string;
    sensors: Sensor[];
    actuators: Actuator[];
    userId?: string | null;
    createdAt?: Date;

    constructor(props: Device) {
        Object.assign(this, props)
    }
}
