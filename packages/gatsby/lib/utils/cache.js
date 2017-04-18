const levelup = require("level")
const Promise = require("bluebird")
const fs = require("fs-extra")

fs.ensureDirSync(`${process.cwd()}/.cache/cache`)
const db = levelup(`${process.cwd()}/.cache/cache`, {
  keyEncoding: `json`,
  valueEncoding: `json`,
})

exports.get = key => {
  return new Promise((resolve, reject) => {
    db.get(key, (err, value) => {
      if (err && !err.notFound) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  })
}

exports.set = (key, value) => {
  return new Promise((resolve, reject) => {
    db.put(key, value, err => {
      if (err) {
        reject(err)
      } else {
        resolve("OK")
      }
    })
  })
}
