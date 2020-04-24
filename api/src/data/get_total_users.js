const { files } = require("../../gc-config")
const { fetchGCdata } = require("../fetch-gc")
const { sortDate } = require("../helper/helper")

const getTotalUniqueViews = async () => {
  const data = await fetchGCdata(files.uniqueViews)
  const sorted = await data.sort(sortDate)
  return sorted
}

module.exports = getTotalUniqueViews
