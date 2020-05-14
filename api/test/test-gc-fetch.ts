import { expect, assert } from "chai";
import fetchGCdata from "../src/fetch-gc";
import { parse } from "querystring";
import redis from "redis-mock";
const { promisify } = require("util");

const redis_client = redis.createClient();

const getAsync: any = promisify(redis_client.get).bind(redis_client);

describe("Stores data in redis after a request", () => {
  it("It ", async () => {
    const filePath =
      "data/analytics/project_ursa_major/screen_resolution_12months_daily_snapshot_doi.json";
    const redis_data_before = await getAsync("screen_res");
    expect(redis_data_before).to.equal(null);

    //this step stores data in cache
    const data = await fetchGCdata(filePath, redis_client, "screen_res");
    const redis_data_after_request = await getAsync("screen_res");
    const parsed = JSON.parse(redis_data_after_request);
    expect(data).to.eql(parsed);
  });
});
