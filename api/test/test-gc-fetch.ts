import { expect } from "chai";
import fetchGCdata from "../src/fetch-gc";
import redis from "redis-mock";
import { files } from "../src/gc-config";
const { promisify } = require("util");
const filePath = files.browser_total_monthly;

const redis_client = redis.createClient();

const getAsync: any = promisify(redis_client.get).bind(redis_client);

describe("Test redis", () => {
  it("Stores data in redis after a request to GC", async () => {
    const redis_data_before = await getAsync("browser_total_monthly");
    expect(redis_data_before).to.equal(null);

    //this step stores data in cache
    const data = await fetchGCdata(
      filePath,
      redis_client,
      "browser_total_monthly"
    );
    const redis_data_after_request = await getAsync("browser_total_monthly");
    const parsed = JSON.parse(redis_data_after_request);
    expect(data).to.eql(parsed);
  });

  it("Still returns data if JSON parse fails and then replaces it", async () => {
    redis_client.set("browser_total_monthly", "blabla");
    const data = await fetchGCdata(
      filePath,
      redis_client,
      "browser_total_monthly"
    );
    expect(data).to.have.length.greaterThan(10);
    const redis_data_after_request = await getAsync("browser_total_monthly");
    const parsed = JSON.parse(redis_data_after_request);
    expect(data).to.eql(parsed);
  });

  it("Device categories not null", async () => {
    const data = await fetchGCdata(
      files.device_category,
      redis_client,
      "random"
    );
    expect(data).to.not.equal(null);
    expect(data).to.have.length.greaterThan(5);
  });

  it("Device brand not null", async () => {
    const data = await fetchGCdata(files.device_brand, redis_client, "random");
    expect(data).to.not.equal(null);
    expect(data).to.have.length.greaterThan(12);
  });
});
