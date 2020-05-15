import { GraphQLObjectType, GraphQLList, GraphQLSchema } from "graphql";

import { files } from "./gc-config";
import fetchGCdata from "./fetch-gc";

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
      async resolve(context: { redis_client: RedisClient; req: Request }) {
        const data: Array<any> = await fetchGCdata(
          files.uniqueViews,
          context.redis_client,
          "total_unique"
        );
        return data;
      },
    },
    total_browser: {
      type: new GraphQLList(BrowserTotalType),
      async resolve(context: { redis_client: RedisClient; req: Request }) {
        const data: Array<any> = await fetchGCdata(
          files.browser_total_monthly,
          context.redis_client,
          "total_browser"
        );
        return data;
      },
    },
    hourly_unique_views: {
      type: new GraphQLList(HourlyUniqueViewsType),
      async resolve(context: { redis_client: RedisClient; req: Request }) {
        const data: Array<any> = await fetchGCdata(
          files.hourly_unique_views,
          context.redis_client,
          "hourly_unique"
        );
        return data;
      },
    },
    operating_system_total: {
      type: new GraphQLList(OperatingSystemDataType),
      async resolve(context: { redis_client: RedisClient; req: Request }) {
        const data: Array<any> = await fetchGCdata(
          files.operating_system_views,
          context.redis_client,
          "opsys"
        );
        return data;
      },
    },
    device_catogories: {
      type: new GraphQLList(DeviceCategoryType),
      async resolve(context: { redis_client: RedisClient; req: Request }) {
        const data: Array<any> = await fetchGCdata(
          files.device_category,
          context.redis_client,
          "device_categories"
        );
        return data;
      },
    },
    opsys_version_total: {
      type: new GraphQLList(OperatingSystemVersionType),
      async resolve(context: { redis_client: RedisClient; req: Request }) {
        const data: Array<any> = await fetchGCdata(
          files.opsys_version,
          context.redis_client,
          "opsys_version"
        );
        return data;
      },
    },
    device_brand: {
      type: new GraphQLList(DeviceBrandType),
      async resolve(context: { redis_client: RedisClient; req: Request }) {
        const data: Array<any> = await fetchGCdata(
          files.device_brand,
          context.redis_client,
          "device_brand"
        );
        return data;
      },
    },
    total_screen_res: {
      type: new GraphQLList(ScreenResType),
      async resolve(context: { redis_client: RedisClient; req: Request }) {
        const data: Array<any> = await fetchGCdata(
          files.screen_res,
          context.redis_client,
          "screen_res"
        );
        return data;
      },
    },
    total_browser_version: {
      type: new GraphQLList(BrowserVersionType),
      async resolve(context: { redis_client: RedisClient; req: Request }) {
        const data: Array<any> = await fetchGCdata(
          files.browser_version,
          context.redis_client,
          "browser_version"
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
