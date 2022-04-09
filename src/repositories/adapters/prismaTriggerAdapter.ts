import Trigger from "../../entities/ActuatorTrigger";
import { ActuatorTrigger } from "@prisma/client";

const prismaTriggerAdapter = (prismaTrigger: ActuatorTrigger): Trigger => {
    return new Trigger({
        ...prismaTrigger,
    })
}

export default prismaTriggerAdapter
