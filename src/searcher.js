import { execMulti } from './utils'

class Searcher {
  constructor(props) {
    this.key = props.key
    this.client = props.client
    this.execMulti = execMulti
  }

  parsePhrase(phrase) {
    return phrase
      .match(/\w+/g)
      .reduce((parsedWords, word) => (
        parsedWords.includes(word)
          ? parsedWords
          : parsedWords.concat([word.toLowerCase()])
      ), [])
  }

  getKeys(words) {
    const cmds = words.map(word => ['keys', `${this.key}:index:${word}*`])
    return this.execMulti(cmds)
      .then(replies => (
        replies.reduce((keys, reply) => (
          keys.concat(reply)
        ), [])
      ))
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
