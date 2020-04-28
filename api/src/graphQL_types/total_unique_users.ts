import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

const UniqueUserType = new GraphQLObjectType({
  name: "total_unique_users",
  fields: () => ({
    total_unique_users: { type: GraphQLString },
    visit_date: { type: GraphQLString },
    total_unique_users_scale: { type: GraphQLFloat },
    visit_month: { type: GraphQLString },
    month_day: { type: GraphQLString },
    visit_year: { type: GraphQLString },
  }),
});

export default UniqueUserType;
