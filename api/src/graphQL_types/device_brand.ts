import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

const DeviceBrandType = new GraphQLObjectType({
  name: "device_brand",
  fields: () => ({
    device_brand: { type: GraphQLString },
    month_year: { type: GraphQLString },
    device_brand_count: { type: GraphQLString },
    percent_month: { type: GraphQLFloat },
  }),
});

export default DeviceBrandType;
