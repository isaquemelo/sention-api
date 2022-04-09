import Sensor from "../../entities/Sensor";
import { Prisma, Sensor as PrismaSensor } from "@prisma/client";

const prismaSensorAdapter = (prismaSensor: PrismaSensor): Sensor => {
    return new Sensor({
        ...prismaSensor,
        port: prismaSensor.port as Prisma.JsonObject
    })
}

export default prismaSensorAdapter
