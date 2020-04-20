const express = require("express")
const graphqlHTTP = require("express-graphql")
// const expressGraphQL = require("express-graphql")
const Rschema = require("./schema")
var cors = require("cors")

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())

app.use(
  "/api",
  graphqlHTTP({
    schema: Rschema,
    graphiql: true,
  })
)

app.listen(PORT, () => `Server started on port ${PORT}`)
