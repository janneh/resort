import { execMulti } from './utils'

class Searcher {
  constructor(props) {
    this.key = props.key
    this.client = props.client
    this.execMulti = execMulti
  }

  flattenResponses(responses) {
    return responses.reduce((acc, response) => (
      acc.concat(response)
    ), [])
  }

  parsePhrase(phrase) {
    return phrase
      .match(/\w+/g)
      .reduce((parsedWords, word) => (
        parsedWords.indexOf(word) !== -1
          ? parsedWords
          : parsedWords.concat([word.toLowerCase()])
      ), [])
  }

  getKeys(words) {
    const matchFull = words.map(word => ['keys', `${this.key}:index:${word}`])
    const matchPart = words.map(word => ['keys', `${this.key}:index:${word}*`])
    return this
      .execMulti(matchFull)
      .then(this.flattenResponses)
      .then(keys => {
        if (keys.length > 0) return keys
        return this
          .execMulti(matchPart)
          .then(this.flattenResponses)
      })
  }

  getResults(keys, searchKey) {
    if (!keys) return Promise.resolve([])
    return this.execMulti([
      ['zunionstore', searchKey, keys.length, ...keys],
      ['expire', searchKey, 10],
      ['zrevrange', searchKey, 0, -1]
    ])
  }

  search(phrase) {
    const words = this.parsePhrase(phrase)
    const searchKey = `${this.key}:search:${words.join(':')}`
    return this.getKeys(words)
      .then(keys => this.getResults(keys, searchKey))
      .then(searchResult => searchResult[2])
  }
}

export default Searcher
