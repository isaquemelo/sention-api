import { Prisma } from "@prisma/client";

import Device from "../../entities/Device";
import prismaSensorAdapter from "./prismaSensorAdapter";
import prismaActuatorAdapter from "./prismaActuatorAdapter";

import Actuator from "../../entities/Actuator";

type prismaDeviceWithRelations = Prisma.DeviceGetPayload<{
    include: {
        sensors: true,
        actuators: {
            include: {
                triggers: true,
            }
        },
    }
}>

const prismaDeviceAdapter = (prismaDevice: prismaDeviceWithRelations): Device => {
    const userId: string = prismaDevice.userId || ""

    return new Device({
        ...prismaDevice,
        userId,
        sensors: prismaDevice.sensors.map(sensor => prismaSensorAdapter(sensor)),
        actuators: prismaDevice.actuators.map((actuator): Actuator => prismaActuatorAdapter(actuator))
    })
}

export default prismaDeviceAdapter
