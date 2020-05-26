import { expect } from "chai";
import fetchGCdata from "../src/fetch-gc";
import redis from "redis-mock";
import { files } from "../src/gc-config";
const { promisify } = require("util");
const filePath = files.screen_res;

const redis_client = redis.createClient();

const getAsync: any = promisify(redis_client.get).bind(redis_client);

describe("Test redis", () => {
  it("Stores data in redis after a request to GC", async () => {
    const redis_data_before = await getAsync("screen_res");
    expect(redis_data_before).to.equal(null);

    //this step stores data in cache
    const data = await fetchGCdata(filePath, redis_client, "screen_res");
    const redis_data_after_request = await getAsync("screen_res");
    const parsed = JSON.parse(redis_data_after_request);
    expect(data).to.eql(parsed);
  });

  it("Still returns data if JSON parse fails and then replaces it", async () => {
    redis_client.set("screen_res", "blabla");
    const data = await fetchGCdata(filePath, redis_client, "screen_res");
    expect(data).to.have.length.greaterThan(70);
    const redis_data_after_request = await getAsync("screen_res");
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

  it("Opsys version not null", async () => {
    const data = await fetchGCdata(files.opsys_version, redis_client, "random");
    expect(data).to.not.equal(null);
    expect(data).to.have.length(36);
  });
});
