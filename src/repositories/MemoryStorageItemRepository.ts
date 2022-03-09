import Item from '../entities/Item'
import { IItemRepository } from './interfaces/IItemRepository'

export default class MemoryStorageItemRepository implements IItemRepository {
    private items: Item[] = []

    async findOne(id: string): Promise<Item | undefined> {
        return await this.items.find(item => item.id === id)
    }

    async index(props: any): Promise<Item[]> {
        return await this.items
    }

    async save(item: Item): Promise<void> {
        this.items.push(item)
    }
}
