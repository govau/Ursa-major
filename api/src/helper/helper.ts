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

export { gcsJsonResponseHandler };
