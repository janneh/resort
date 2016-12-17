class Indexer {
  constructor(props) {
    this.key = props.key
    this.client = props.client
    // props.filterFn: word => boolean
    this.filterFn = props.filterFn
  }

  parseWords(words) {
    if (!words) return {}
    const wordCounts = {}
    for (let i = 0; i < words.length; i++) {
      const w = words[i]
      wordCounts[w] = wordCounts[w]
        ? ++wordCounts[w]
        : 1
    }
    return { words: Object.keys(wordCounts), wordCounts }
  }

  parseText(text) {
    const allWords = text
      .match(/\w+/g)
      .map(w => w.toLowerCase())
    const words = this.filterFn
      ? allWords.map(word).filter(this.filterFn)
      : allWords
    return this.parseWords(words)
  }

  index(id, text) {
    const { words = [], wordCounts } = this.parseText(text)
    const cmds = words.map(word => (
      ['zadd', `${this.key}:index:${word}`, wordCounts[word], id]
    ))
    this.client.multi(cmds).exec(() => {})
  }
}

export default Indexer
