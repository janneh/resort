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
        parsedWords.indexOf(word) !== -1
          ? parsedWords
          : parsedWords.concat([word.toLowerCase()])
      ), [])
  }

  getResults(words) {
    if (!words) return Promise.resolve([])
    const keys = words.map(word => `${this.key}:index:${word}`)
    const searchKey = `${this.key}:search:${words.join(':')}`
    return this.execMulti([
      ['zunionstore', searchKey, keys.length, ...keys],
      ['expire', searchKey, 10],
      ['zrevrange', searchKey, 0, -1]
    ])
  }

  search(phrase) {
    const words = this.parsePhrase(phrase)
    return this.getResults(words).then(result => result[2])
  }
}

export default Searcher
