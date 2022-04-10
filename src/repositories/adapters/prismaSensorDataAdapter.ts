import SensorData from '../../entities/SensorData'
import { Prisma, SensorData as PrismaSensorData } from '@prisma/client'

const prismaSensorDataAdapter = (prismaSensorData: PrismaSensorData): SensorData => {
    return new SensorData({
        ...prismaSensorData,
        data: prismaSensorData.data as Prisma.JsonObject
    })
}

export default prismaSensorDataAdapter
