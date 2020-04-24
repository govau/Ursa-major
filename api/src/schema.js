const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql")

const UniqueUserType = require("./graphQL_types/total_unique_users")

const getTotalUniqueViews = require("./data/get_total_users")

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    total_unique: {
      type: new GraphQLList(UniqueUserType),
      async resolve(parentValue, args) {
        return await getTotalUniqueViews()
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
