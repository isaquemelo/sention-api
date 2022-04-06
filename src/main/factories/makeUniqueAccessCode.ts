import shortid from 'shortid'

const makeUniqueAccessCode = (): string => {
    return shortid.generate()
}

export { makeUniqueAccessCode }
