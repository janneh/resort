import test from 'tape'
import { createSearcher, createIndexer } from '../'

test('createIndexer should be a function', t => {
  t.plan(1)
  t.is(typeof createIndexer, 'function')
})

test('createIndexer should return an indexer object', t => {
  t.plan(1)
  t.is(typeof createIndexer({}), 'object')
})

test('createSearcher should be a function', t => {
  t.plan(1)
  t.is(typeof createSearcher, 'function')
})

test('createSearcher should return an searcher object', t => {
  t.plan(1)
  t.is(typeof createSearcher({}), 'object')
})

test('done testing ~~bye', t => {
  t.end()
})
