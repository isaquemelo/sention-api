import CreateItemUseCase from '../../useCases/CreateItemUseCase'
import IndexItemsUseCase from '../../useCases/IndexItemsUseCase'
import ItemController from '../../controllers/ItemController'
import MemoryStorageItemRepository from '../../repositories/MemoryStorageItemRepository'


const makeItemController = (): ItemController => {
    const memoryStorageProvider = new MemoryStorageItemRepository()
    const createItemUseCase = new CreateItemUseCase(memoryStorageProvider)
    const indexItemUseCase = new IndexItemsUseCase(memoryStorageProvider)

    return new ItemController(createItemUseCase, indexItemUseCase)
}

export { makeItemController }
