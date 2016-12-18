export function execMulti(cmds) {
  return new Promise((resolve, reject) => {
    this.client
      .multi(cmds)
      .exec((err, replies) => {
        if (err) reject(err)
        resolve(replies)
      })
  })
}
