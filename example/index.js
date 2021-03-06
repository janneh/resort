import { createIndexer, createSearcher } from '../index'

const key = 'panagrams'

// Indexing

const indexer = createIndexer({ key })

const data = {
  111: 'The quick brown fox jumps over the lazy dog!',
  222: 'My faxed joke won a pager in the cable TV quiz show.',
  333: 'Five hexing wizard bots jump quickly.'
}

const indexing = Object.keys(data).map(key =>
  indexer.index(key, data[key])
)

Promise.all(indexing)
  .then(() => {
    console.log('Indexing complete...') // eslint-disable-line
  })

// Searching

const searcher = createSearcher({ key })

// 'jum' should match 111 (on 'jumps') and 222 (on 'jump')
searcher.search('jump')
  .then(result => {
    console.log("Search results:", result) // eslint-disable-line
  })
