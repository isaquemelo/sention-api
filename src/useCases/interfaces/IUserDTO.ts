import Device from '../../entities/Device'

export interface IUserDTO {
    id?: string
    name: string,
    email: string,
    password: string,
    devices: Device[]
}
