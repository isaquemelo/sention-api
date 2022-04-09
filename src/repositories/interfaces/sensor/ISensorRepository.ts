import { Device } from "@prisma/client";
import Sensor from "../../../entities/Sensor";
import { ISensorFindingCriterias } from "./ISensorFindingCriterias";


export interface ISensorRepository {
    findOne(params: ISensorFindingCriterias): Promise<Sensor | false>;
    save(sensor: Sensor, deviceId: string): Promise<Sensor | false>;
}
