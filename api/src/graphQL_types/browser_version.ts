import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

const BrowserVersionType = new GraphQLObjectType({
  name: "browser_version",
  fields: () => ({
    device_browser_version: { type: GraphQLString },
    month_year: { type: GraphQLString },
    browser_version_count: { type: GraphQLString },
    percent_month: { type: GraphQLFloat },
  }),
});

export default BrowserVersionType;
