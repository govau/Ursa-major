import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} from "graphql";

import { files } from "./gc-config";
import fetchGCdata from "./fetch-gc";
import { sortDate } from "./helper/helper";

import UniqueUserType from "./graphQL_types/total_unique_users";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    total_unique: {
      type: new GraphQLList(UniqueUserType),
      async resolve(parentValue: any, args: any) {
        const data: Array<Object> = await fetchGCdata(files.uniqueViews);
        const sorted: Array<Object> = data.sort(sortDate);
        return sorted;
      },
    },
  },
});

const RQexport = new GraphQLSchema({
  query: RootQuery,
});

export default RQexport;
