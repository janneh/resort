import { execMulti } from './utils'

class Indexer {
  constructor(props) {
    this.key = props.key
    this.client = props.client
    this.execMulti = execMulti
    // props.filterFn: word => boolean
    this.filterFn = props.filterFn
  }

  parseWords(words) {
    if (!words) return {}
    return words.reduce((counts, w) => {
      counts[w] = counts[w]
        ? ++counts[w]
        : 1
      return counts
    }, {})
  }

  parseText(text) {
    const allWords = text
      .match(/\w+/g)
      .map(w => w.toLowerCase())
    const words = this.filterFn
      ? allWords.filter(this.filterFn)
      : allWords
    return this.parseWords(words)
  }

  index(id, text) {
    const wordCounts = this.parseText(text)
    const words = Object.keys(wordCounts)
    const cmds = words.map(word => (
      ['zadd', `${this.key}:index:${word}`, wordCounts[word], id]
    ))
    return this.execMulti(cmds)
  }
}

export default Indexer
