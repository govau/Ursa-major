const ndjson = require("ndjson")
const helper = require("./helper/helper")
const { gc, files } = require("../gc-config")

const sampleBucket = gc.bucket(files.bucket)

fetchGCdata = (filePath) => {
  const file = sampleBucket.file(filePath)
  let buffer = []
  if (file) {
    return new Promise((resolve, reject) => {
      file
        .createReadStream()
        .on("error", (error) => reject(error))
        .on("response", helper.gcsJsonResponseHandler)
        .pipe(ndjson.parse())
        .on("data", (obj) => {
          buffer.push(obj)
        })
        .on("end", () => {
          resolve(buffer)
        })
    })
  }
}

module.exports = {
  fetchGCdata,
}
