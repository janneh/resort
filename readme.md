resort
=====================

## Install

```bash
$ npm install --save resort
```

## Usage

### Indexing

```js
import { createIndexer } from 'resort'

const indexer = createIndexer({ key: 'myIndex' })

const data = [
  { id: 'a', content: 'When you were here before' },
  { id: 'b', content: 'Could not look you in the eye' },
  { id: 'c', content: 'You are just like an angel' }
  { id: 'd', content: 'Your skin makes me cry' }
]

const indexing = data.map(page =>
  indexer.index(page.id, page.content)
)

Promise.all(indexing)
  .then(() => {
    console.log('Indexing complete...')
  })
```

### Searching

```js
import { createSearcher } from 'resort'

const searcher = createSearcher({ key: 'myIndex' })

searcher.search('cry')
  .then(result => {
    console.log('Search results:', result)
  })
```
