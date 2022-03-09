
import { Request, Response } from 'express'
import CreateItemUseCase from '../useCases/CreateItemUseCase'
import IndexItemsUseCase from '../useCases/IndexItemsUseCase'

export default class ItemController {
    private createItemUseCase: CreateItemUseCase
    private indexItemUseCase: IndexItemsUseCase

    constructor(createItemUseCase: CreateItemUseCase, indexItemUseCase: IndexItemsUseCase) {
        this.createItemUseCase = createItemUseCase
        this.indexItemUseCase = indexItemUseCase
    }

    async store(req: Request, res: Response): Promise<Response | undefined> {
        const { msg: { id: itemId }, createdAt } = req.body
        //   console.log(`Item ${itemId} is being processed.`)

        if (!itemId) {
            return res.status(400).json({ message: 'No id provided' })
        }

        try {
            await this.createItemUseCase.execute(
                {
                    itemId,
                    createdAt,
                    id: ''
                }
            )
            return res.status(201).send()
        } catch (err: any) {
            res.status(400).json({ message: err.message || 'STORE: Not messaged error' })
        }
    }

    async index(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const result = await this.indexItemUseCase.execute({
                ...req.body
            })

            return res.status(200).json(result)
        } catch (err: any) {
            res.status(400).json({ message: err.message || 'INDEXING: Not messaged error' })
        }
    }
}
