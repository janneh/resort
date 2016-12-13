import { createClient } from 'redis'

export function createIndexer(props) {
  // assert props
  return new Indexer(props)
}

export function createSearcher(props) {
  // assert props
  return new Searcher(props)
}

class Indexer {
  constructor(props) {
    this.key = props.key
    this.client = props.client || createClient()
  }

  index() {
  }
}

class Searcher {
  constructor(props) {
    this.key = props.key
    this.client = props.client || createClient()
  }

  search() {
  }
}
