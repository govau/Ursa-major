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
import ScreenResType from "./graphQL_types/screen_res";
import BrowserVersionType from "./graphQL_types/browser_version";
import { RedisClient } from "redis";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    total_unique: {
      type: new GraphQLList(UniqueUserType),
      args: {
        id: { type: GraphQLString },
      },
      async resolve(
        parentValue: any,
        args: any,
        context: { client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.uniqueViews,
          context.client,
          args.id
        );
        const sorted: Array<Object> = data.sort(sortDate);
        return sorted;
      },
    },
    total_browser: {
      type: new GraphQLList(BrowserTotalType),
      args: {
        id: { type: GraphQLString },
      },
      async resolve(
        parentValue: any,
        args: any,
        context: { client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.browser_total_monthly,
          context.client,
          args.id
        );
        return data;
      },
    },
    hourly_unique_views: {
      type: new GraphQLList(HourlyUniqueViewsType),
      args: {
        id: { type: GraphQLString },
      },
      async resolve(
        parentValue: any,
        args: any,
        context: { client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.hourly_unique_views,
          context.client,
          args.id
        );
        return data;
      },
    },
    operating_system_total: {
      type: new GraphQLList(OperatingSystemDataType),
      args: {
        id: { type: GraphQLString },
      },
      async resolve(
        parentValue: any,
        args: any,
        context: { client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.operating_system_views,
          context.client,
          args.id
        );
        return data;
      },
    },
    device_catogories: {
      type: new GraphQLList(DeviceCategoryType),
      args: {
        id: { type: GraphQLString },
      },
      async resolve(
        parentValue: any,
        args: any,
        context: { client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.device_category,
          context.client,
          args.id
        );
        return data;
      },
    },
    opsys_version_total: {
      type: new GraphQLList(OperatingSystemVersionType),
      args: {
        id: { type: GraphQLString },
      },
      async resolve(
        parentValue: any,
        args: any,
        context: { client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.opsys_version,
          context.client,
          args.id
        );
        return data;
      },
    },
    device_brand: {
      type: new GraphQLList(DeviceBrandType),
      args: {
        id: { type: GraphQLString },
      },
      async resolve(
        parentValue: any,
        args: any,
        context: { client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.device_brand,
          context.client,
          args.id
        );
        return data;
      },
    },
    total_screen_res: {
      type: new GraphQLList(ScreenResType),
      args: {
        id: { type: GraphQLString },
      },
      async resolve(
        parentValue: any,
        args: any,
        context: { client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.screen_res,
          context.client,
          args.id
        );
        return data;
      },
    },
    total_browser_version: {
      type: new GraphQLList(BrowserVersionType),
      args: {
        id: { type: GraphQLString },
      },
      async resolve(
        parentValue: any,
        args: any,
        context: { client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.browser_version,
          context.client,
          args.id
        );
        return data;
      },
    },
  },
});

const RQexport = new GraphQLSchema({
  query: RootQuery,
});

export default RQexport;
