import Actuator from '../../../entities/Actuator'

import { IActuatorFindingCriterias } from './IActuatorFindingCriterias'

export interface IActuatorRepository {
    findOne(params: IActuatorFindingCriterias): Promise<Actuator | false>;
    save(actuator: Actuator, deviceId: string): Promise<Actuator | false>;
    delete(sensorId: string): Promise<boolean>;
}
