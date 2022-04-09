import { Prisma } from "@prisma/client";

import User from "../../entities/User";
import Device from "../../entities/Device";

import prismaDeviceAdapter from "./prismaDeviceAdapter";

type prismaUserWithRelations = Prisma.UserGetPayload<{
    include: {
        devices: {
            include: {
                actuators: {
                    include: {
                        triggers: true,
                    }
                },
                sensors: true,
            }
        },
    }
}>

const prismaUserAdapter = (prismaUser: prismaUserWithRelations): User => {
    return new User({
        ...prismaUser,
        devices: prismaUser.devices.map((device): Device => prismaDeviceAdapter(device))
    })
}

export default prismaUserAdapter
