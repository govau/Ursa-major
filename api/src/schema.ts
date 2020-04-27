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
import BrowserTotalType from "./graphQL_types/browsers_monthly";
import HourlyUniqueViewsType from "./graphQL_types/hourly_unique_views";
import OperatingSystemDataType from "./graphQL_types/operating_sys";
import DeviceCategoryType from "./graphQL_types/device_category";
import OperatingSystemVersionType from "./graphQL_types/opsys_version";
import DeviceBrandType from "./graphQL_types/device_brand";

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
    total_browser: {
      type: new GraphQLList(BrowserTotalType),
      async resolve(parentValue: any, args: any) {
        const data: Array<Object> = await fetchGCdata(
          files.browser_total_monthly
        );
        return data;
      },
    },
    hourly_unique_views: {
      type: new GraphQLList(HourlyUniqueViewsType),
      async resolve(parentValue: any, args: any) {
        const data: Array<Object> = await fetchGCdata(
          files.hourly_unique_views
        );
        return data;
      },
    },
    operating_system_views: {
      type: new GraphQLList(OperatingSystemDataType),
      async resolve(parentValue: any, args: any) {
        const data: Array<Object> = await fetchGCdata(
          files.operating_system_views
        );
        return data;
      },
    },
    device_catogories: {
      type: new GraphQLList(DeviceCategoryType),
      async resolve(parentValue: any, args: any) {
        const data: Array<Object> = await fetchGCdata(files.device_category);
        return data;
      },
    },
    operating_sys_version: {
      type: new GraphQLList(OperatingSystemVersionType),
      async resolve(parentValue: any, args: any) {
        const data: Array<Object> = await fetchGCdata(files.opsys_version);
        return data;
      },
    },
    device_brand: {
      type: new GraphQLList(DeviceBrandType),
      async resolve(parentValue: any, args: any) {
        const data: Array<Object> = await fetchGCdata(files.device_brand);
        return data;
      },
    },
  },
});

const RQexport = new GraphQLSchema({
  query: RootQuery,
});

export default RQexport;
