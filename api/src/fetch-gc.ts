import ndjson from "ndjson";
import { gcsJsonResponseHandler } from "./helper/helper";
import { gc, files } from "./gc-config";
import { RedisClient } from "redis";
const { promisify } = require("util");

const cacheExpiry: number = 14400;

const sampleBucket = gc.bucket(files.bucket);

const fetchGCdata: any = async (
  filePath: String,
  client: RedisClient,
  id: any
) => {
  const getAsync: any = promisify(client.get).bind(client);
  const file = sampleBucket.file(filePath);
  let buffer: Array<Object> = [];

  return new Promise((resolve, reject) => {
    getAsync(id)
      .then((res: any) => {
        if (res !== null) {
          try {
            return JSON.parse(res);
          } catch (error) {
            throw new Error(`JSON not parsed: ${error}`);
          }
        } else {
          throw new Error("Not cached");
        }
      })
      .then((data: any) => resolve(data))
      .catch((err: any) => {
        // If the data is not cached
        if (file) {
          try {
            file
              .createReadStream()
              .on("error", (error: any) => reject(error))
              .on("response", gcsJsonResponseHandler)
              .pipe(ndjson.parse())
              .on("data", (obj: any) => {
                buffer.push(obj);
              })
              .on("end", () => {
                resolve(buffer);
                client.setex(id, cacheExpiry, JSON.stringify(buffer));
              });
          } catch (error) {
            console.error(error);
          }
        }
      });
  });
};

export default fetchGCdata;
