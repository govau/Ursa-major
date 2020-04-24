const { Storage } = require("@google-cloud/storage")
var cfenv = require("cfenv")
const environment = process.env.NODE_ENV || "development"
require("dotenv").config()

var appEnv
if (environment !== "development") {
  appEnv = cfenv.getAppEnv()
}

const gc =
  environment !== "development"
    ? new Storage({
        credentials: {
          client_email:
            appEnv.services["user-provided"][0].credentials.gc_email,
          private_key: appEnv.services["user-provided"][0].credentials.gc_pk,
        },
      })
    : new Storage({
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, "\n"),
        },
      })

const files = {
  bucket: "us-east1-dta-airflow-b3415db4-bucket",
  browser: "data/analytics/json/device_browser_daily_snapshot_doi.json",
  uniqueViews:
    "data/analytics/project_ursa_major/uniquevisitors_90days_daily_snapshot_doi.json",
  agency: "data/analytics/json/device_category_daily_snapshot_doi.json",
}

module.exports = { gc, files }
