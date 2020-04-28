import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

const HourlyUniqueViewsType = new GraphQLObjectType({
  name: "hourly_unique_views",
  fields: () => ({
    total_unique_users: { type: GraphQLString },
    total_unique_users_scale: { type: GraphQLString },
    visit_hour: { type: GraphQLString },
    visit_weekday: { type: GraphQLString },
  }),
});

export default HourlyUniqueViewsType;
