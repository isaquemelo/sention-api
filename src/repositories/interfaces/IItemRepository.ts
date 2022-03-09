import Item from "../../entities/Item";


export interface IItemRepository {
    findOne(id: string): Promise<Item | undefined>;
    index(props: any): Promise<Item[]>;
    save(item: Item): Promise<void>;
}
