import { Response } from "express";

const gcsJsonResponseHandler = (response: any) => {
  console.debug(
    response.statusCode,
    response.statusMessage,
    response.request.href,
    response.headers["content-length"]
  );
  if (response.headers["content-length"] == 0) {
    console.error("ERROR JSON file is empty: ", response.request.href);
  }
};

const sortDate = (a: any, b: any) => {
  return new Date(a.visit_date).getTime() - new Date(b.visit_date).getTime();
};

export { sortDate, gcsJsonResponseHandler };
