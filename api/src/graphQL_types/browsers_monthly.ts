import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

const BrowserTotalType = new GraphQLObjectType({
  name: "total_browser",
  fields: () => ({
    device_browser: { type: GraphQLString },
    month_year: { type: GraphQLString },
    browser_count: { type: GraphQLFloat },
    percent_month: { type: GraphQLFloat },
  }),
});

export default BrowserTotalType;
