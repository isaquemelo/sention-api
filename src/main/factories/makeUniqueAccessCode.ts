import shortid from 'shortid'

const makeUniqueAccessCode = (): string => {
    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')
    return shortid.generate()
}

export { makeUniqueAccessCode }
