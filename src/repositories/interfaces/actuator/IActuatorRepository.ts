import Actuator from '../../../entities/Actuator'
import ActuatorTrigger from '../../../entities/ActuatorTrigger'

import { IActuatorFindingCriterias } from './IActuatorFindingCriterias'

export interface IActuatorRepository {
    findOne(params: IActuatorFindingCriterias): Promise<Actuator | false>;
    save(actuator: Actuator, deviceId: string): Promise<Actuator | false>;
    delete(sensorId: string): Promise<boolean>;

    saveTrigger(trigger: ActuatorTrigger, actuatorId: string): Promise<ActuatorTrigger | false>;
    deleteTrigger(triggerId: string): Promise<boolean>;
}
