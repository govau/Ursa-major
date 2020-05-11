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
      async resolve(
        parentValue: any,
        args: any,
        context: { redis_client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.uniqueViews,
          context.redis_client,
          "total_unique"
        );
        const sorted: Array<Object> = data.sort(sortDate);
        return sorted;
      },
    },
    total_browser: {
      type: new GraphQLList(BrowserTotalType),
      async resolve(
        parentValue: any,
        args: any,
        context: { redis_client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.browser_total_monthly,
          context.redis_client,
          "total_browser"
        );
        return data;
      },
    },
    hourly_unique_views: {
      type: new GraphQLList(HourlyUniqueViewsType),
      async resolve(
        parentValue: any,
        args: any,
        context: { redis_client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.hourly_unique_views,
          context.redis_client,
          "hourly_unique"
        );
        return data;
      },
    },
    operating_system_total: {
      type: new GraphQLList(OperatingSystemDataType),
      async resolve(
        parentValue: any,
        args: any,
        context: { redis_client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.operating_system_views,
          context.redis_client,
          "opsys"
        );
        return data;
      },
    },
    device_catogories: {
      type: new GraphQLList(DeviceCategoryType),
      async resolve(
        parentValue: any,
        args: any,
        context: { redis_client: RedisClient; req: Request }
      ) {
        // const data: Array<Object> = await fetchGCdata(
        //   files.device_category,
        //   context.redis_client,
        //   "device_categories"
        // );
        return [
          {
            device_category: "desktop",
            month_year: "Jun 2019",
            device_category_count: "9644900",
            percent_month: 55.66,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Jun 2019",
            device_category_count: "6227851",
            percent_month: 35.94,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Jun 2019",
            device_category_count: "1454862",
            percent_month: 8.4,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Jul 2019",
            device_category_count: "12468624",
            percent_month: 39.04,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Jul 2019",
            device_category_count: "2652707",
            percent_month: 8.3,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "Jul 2019",
            device_category_count: "16819965",
            percent_month: 52.66,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Aug 2019",
            device_category_count: "2102920",
            percent_month: 8.68,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Aug 2019",
            device_category_count: "8407251",
            percent_month: 34.7,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "Aug 2019",
            device_category_count: "13719009",
            percent_month: 56.62,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Sep 2019",
            device_category_count: "7326817",
            percent_month: 33.66,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Sep 2019",
            device_category_count: "1867037",
            percent_month: 8.58,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "Sep 2019",
            device_category_count: "12575527",
            percent_month: 57.77,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Oct 2019",
            device_category_count: "1840103",
            percent_month: 8.04,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "Oct 2019",
            device_category_count: "13278039",
            percent_month: 58,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Oct 2019",
            device_category_count: "7776515",
            percent_month: 33.97,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "Nov 2019",
            device_category_count: "11710555",
            percent_month: 56.76,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Nov 2019",
            device_category_count: "7351908",
            percent_month: 35.64,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Nov 2019",
            device_category_count: "1568418",
            percent_month: 7.6,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Dec 2019",
            device_category_count: "1306107",
            percent_month: 7.81,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Dec 2019",
            device_category_count: "6274451",
            percent_month: 37.52,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "Dec 2019",
            device_category_count: "9144369",
            percent_month: 54.68,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Jan 2020",
            device_category_count: "1517430",
            percent_month: 7.51,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "Jan 2020",
            device_category_count: "10923553",
            percent_month: 54.09,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Jan 2020",
            device_category_count: "7752580",
            percent_month: 38.39,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "Feb 2020",
            device_category_count: "11537905",
            percent_month: 57.42,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Feb 2020",
            device_category_count: "7150797",
            percent_month: 35.59,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Feb 2020",
            device_category_count: "1404168",
            percent_month: 6.99,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Mar 2020",
            device_category_count: "2030158",
            percent_month: 5.59,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "Mar 2020",
            device_category_count: "16857728",
            percent_month: 46.42,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Mar 2020",
            device_category_count: "17427119",
            percent_month: 47.99,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "Apr 2020",
            device_category_count: "18384883",
            percent_month: 45.33,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "Apr 2020",
            device_category_count: "20230915",
            percent_month: 49.88,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "Apr 2020",
            device_category_count: "1939358",
            percent_month: 4.78,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "tablet",
            month_year: "May 2020",
            device_category_count: "531220",
            percent_month: 4.05,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "desktop",
            month_year: "May 2020",
            device_category_count: "5795782",
            percent_month: 44.2,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
          {
            device_category: "mobile",
            month_year: "May 2020",
            device_category_count: "6784243",
            percent_month: 51.74,
            post_stamp: "2020-05-10 22:58:11.048932 UTC",
          },
        ];
      },
    },
    opsys_version_total: {
      type: new GraphQLList(OperatingSystemVersionType),
      async resolve(
        parentValue: any,
        args: any,
        context: { redis_client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.opsys_version,
          context.redis_client,
          "opsys_version"
        );
        return data;
      },
    },
    device_brand: {
      type: new GraphQLList(DeviceBrandType),
      async resolve(
        parentValue: any,
        args: any,
        context: { redis_client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.device_brand,
          context.redis_client,
          "device_brand"
        );
        return data;
      },
    },
    total_screen_res: {
      type: new GraphQLList(ScreenResType),
      async resolve(
        parentValue: any,
        args: any,
        context: { redis_client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
          files.screen_res,
          context.redis_client,
          "screen_res"
        );
        return data;
      },
    },
    total_browser_version: {
      type: new GraphQLList(BrowserVersionType),
      async resolve(
        parentValue: any,
        args: any,
        context: { redis_client: RedisClient; req: Request }
      ) {
        const data: Array<Object> = await fetchGCdata(
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
