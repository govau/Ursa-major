import ndjson from "ndjson";
import { gcsJsonResponseHandler } from "./helper/helper";
import { gc, files } from "./gc-config";

const sampleBucket = gc.bucket(files.bucket);

const fetchGCdata: any = (filePath: String) => {
  const file = sampleBucket.file(filePath);
  let buffer: Array<Object> = [];
  if (file) {
    try {
      return new Promise((resolve, reject) => {
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
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
  console.log("File not found");
};

export default fetchGCdata;
