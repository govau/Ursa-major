import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

const OperatingSystemVersionType = new GraphQLObjectType({
  name: "operating_system_version",
  fields: () => ({
    device_opsys_ver: { type: GraphQLString },
    month_year: { type: GraphQLString },
    opsys_version_count: { type: GraphQLString },
    percent_month: { type: GraphQLFloat },
  }),
});

export default OperatingSystemVersionType;
