import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

const DeviceCategoryType = new GraphQLObjectType({
  name: "device_category",
  fields: () => ({
    device_category: { type: GraphQLString },
    month_year: { type: GraphQLString },
    device_category_count: { type: GraphQLFloat },
    percent_month: { type: GraphQLFloat },
  }),
});

export default DeviceCategoryType;
