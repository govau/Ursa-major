import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

const ScreenResType = new GraphQLObjectType({
  name: "screen_resolution",
  fields: () => ({
    device_screen_res: { type: GraphQLString },
    month_year: { type: GraphQLString },
    screen_res_count: { type: GraphQLFloat },
    percent_month: { type: GraphQLFloat },
  }),
});

export default ScreenResType;
