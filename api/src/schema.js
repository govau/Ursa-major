const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql")
const { fetchGCdata } = require("./fetch-gc")
const { files } = require("../gc-config")

const BrowserType = new GraphQLObjectType({
  name: "Browser",
  fields: () => ({
    agency: { type: GraphQLString },
    reg_domain: { type: GraphQLString },
    device_browser: { type: GraphQLString },
    total_device_category: { type: GraphQLString },
    total_device_category_day: { type: GraphQLString },
    posted_timestamp: { type: GraphQLString },
    inc_posted_timestamp: { type: GraphQLString },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    browsers: {
      type: new GraphQLList(BrowserType),
      args: {
        reg_domain: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        const agencyData = fetchGCdata(files.agency)
          .then((data) => data)
          .then((res) => {
            return res.filter((row) => row.reg_domain === args.reg_domain)
          })
        return agencyData
      },
    },
    browser: {
      type: new GraphQLList(BrowserType),
      resolve(parentValue, args) {
        return fetchGCdata(files.agency).then((some) => some)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
