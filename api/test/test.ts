import { expect, assert } from "chai";
import request from "supertest";
import App from "../src/index";

describe("App", () => {
  it("Gives 404 response when invalid path", (done) => {
    request(App).get("/").expect(404, done);
  });

  it("Gives 400 when bad request", (done) => {
    request(App).post("/api").send({ query: "{bla}" }).expect(400, done);
  });

  it("Gives 200 when good request", (done) => {
    request(App)
      .post("/api")
      .send({ query: "{opsys_version_total {name}}" })
      .expect(200, done);
  });
});
