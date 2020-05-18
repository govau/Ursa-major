import ndjson from "ndjson";
import { gcsJsonResponseHandler } from "./helper/helper";
import { gc, files } from "./gc-config";
import { RedisClient } from "redis";
import { promisify } from "util";

const cacheExpiry = 14400;

const sampleBucket = gc.bucket(files.bucket);

const fetchGCdata: any = async (
  filePath: string,
  redis_client: RedisClient,
  id: string
) => {
  const getAsync: any = promisify(redis_client.get).bind(redis_client);
  const file = sampleBucket.file(filePath);
  const buffer: Array<any> = [];

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
        console.log(err);
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
                redis_client.setex(id, cacheExpiry, JSON.stringify(buffer));
              });
          } catch (error) {
            console.error(error);
          }
        }
      });
  });
};

export default fetchGCdata;
