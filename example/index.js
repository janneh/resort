import { createIndexer } from '../index'

const key = 'panagrams'

// Indexing

const indexer = createIndexer({ key })

const data = {
  111: 'The quick brown fox jumps over the lazy dog!',
  222: 'My faxed joke won a pager in the cable TV quiz show.',
  333: 'Five hexing wizard bots jump quickly.'
}

for (const key in data) {
  indexer.index(key, data[key])
}
