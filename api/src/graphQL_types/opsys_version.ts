import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

const OperatingSystemVersionType = new GraphQLObjectType({
  name: "operating_system_version",
  fields: () => ({
    parent: { type: GraphQLString },
    name: { type: GraphQLString },
    value: { type: GraphQLFloat },
  }),
});

export default OperatingSystemVersionType;
