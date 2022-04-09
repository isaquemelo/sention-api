import Actuator from "../../entities/Actuator";
import { Prisma } from "@prisma/client";
import prismaTriggerAdapter from "./prismaTriggerAdapter";
import ActuatorTrigger from "../../entities/ActuatorTrigger";

type prismaActuatorWithRelations = Prisma.ActuatorGetPayload<{
    include: {
        triggers: true,
    }
}>

const prismaActuatorAdapter = (prismaActuator: prismaActuatorWithRelations): Actuator => {
    return new Actuator({
        ...prismaActuator,
        triggers: prismaActuator.triggers.map((trigger): ActuatorTrigger => prismaTriggerAdapter(trigger))
    })
}

export default prismaActuatorAdapter
