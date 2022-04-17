import { ISensorDataDTO } from './ISensorDataDTO'

export interface ISensorsBulkDataDTO {
    data: ISensorDataDTO[],
    timestamp?: string
}
