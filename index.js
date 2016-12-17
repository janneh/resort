import { createClient } from 'redis'

import Indexer from './src/indexer'
import Searcher from './src/searcher'

export function createIndexer(props) {
  // assert props
  props.client = props.client || createClient()
  return new Indexer(props)
}

export function createSearcher(props) {
  // assert props
  props.client = props.client || createClient()
  return new Searcher(props)
}
