import { GraphQLObjectType, GraphQLString } from "graphql";

const AgencyCountType = new GraphQLObjectType({
  name: "agency_count",
  fields: () => ({
    registered_domain_count: { type: GraphQLString },
    agency_count: { type: GraphQLString },
  }),
});

export default AgencyCountType;
