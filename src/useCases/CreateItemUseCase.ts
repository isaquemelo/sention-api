import { IItemRepository } from '../repositories/interfaces/IItemRepository'
import { IItemDTO } from './interfaces/IItemDTO'
import Item from './../entities/Item'

export default class CreateItemUseCase {
    private itemsRepository: IItemRepository

    constructor(itemsRepository: IItemRepository) {
        this.itemsRepository = itemsRepository
    }

    async execute(data: IItemDTO) {
        const { itemId, createdAt } = data
        const item = new Item({ itemId, createdAt, condition: "filling the gap" })
        await this.itemsRepository.save(item)
    }

}
