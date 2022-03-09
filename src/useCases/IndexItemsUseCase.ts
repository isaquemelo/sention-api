import { IItemRepository } from '../repositories/interfaces/IItemRepository'
import Item from '../entities/Item'

import { IAction } from './interfaces/IAction'

export default class IndexItemsUseCase {
    private itemsRepository: IItemRepository

    constructor(itemsRepository: IItemRepository) {
        this.itemsRepository = itemsRepository
    }

    async execute(params: any): Promise<Item[]> {
        return this.itemsRepository.index({})
    }
}
