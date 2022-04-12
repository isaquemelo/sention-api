export default class Item {
    readonly id?: string
    condition?: string
    itemId?: string
    createdAt?: string

    constructor(props: Item) {
        Object.assign(this, props)
    }
}
