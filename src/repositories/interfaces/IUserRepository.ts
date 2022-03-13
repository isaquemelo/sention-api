import User from "../../entities/User";


export interface IUserRepository {
    findOne(id: string): Promise<User | false>;
    save(user: User): Promise<User | false>;
}
