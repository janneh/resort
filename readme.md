resort
=====================

## Install

```bash
$ npm install --save resort
```

## Usage

#### Indexing

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

#### Searching

```js
import { createSearcher } from 'resort'

const searcher = createSearcher({ key: 'myIndex' })

searcher.search('cry')
  .then(result => {
    console.log('Search results:', result)
  })
```

### API

#### createIndexer(options)
Returns an indexer with an `index(id, content)` method on it to be used for indexing.
##### options
Type: `object`
###### key *(required)*
Type: `string`

The key under which the index will be available
###### client
Type: `RedisClient`

[`RedisClient`](https://github.com/NodeRedis/node_redis#rediscreateclient) to connect to Redis. Default to host `localhost` and port `6379` if no client option is provided.

###### filterFn
Type: `function(word: String): Boolean`

Filter function applied to each words of in the content.

#### createSearcher(options)
##### options
Type: `object`
###### key *(required)*
Type: `string`

The key for the index to search
###### client
Type: `RedisClient`

[`RedisClient`](https://github.com/NodeRedis/node_redis#rediscreateclient) to connect to Redis. Default to host `localhost` and port `6379` if no client option is provided.
