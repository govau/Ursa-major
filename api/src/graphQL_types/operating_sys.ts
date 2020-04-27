import { GraphQLObjectType, GraphQLString } from "graphql";

const OperatingSystemDataType = new GraphQLObjectType({
  name: "op_system_total",
  fields: () => ({
    device_opsys: { type: GraphQLString },
    month_year: { type: GraphQLString },
    opsys_count: { type: GraphQLString },
  }),
});

export default OperatingSystemDataType;
