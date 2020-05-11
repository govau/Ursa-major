import express, { Application } from "express";
import graphqlHTTP from "express-graphql";
import Rschema from "./schema";
import cors from "cors";
import helmet from "helmet";
import redis from "redis";
import cfenv from "cfenv";
import bodyParser from "body-parser";
var env = process.env.NODE_ENV || "dev";

var appEnv: any;
if (env !== "dev") {
  appEnv = cfenv.getAppEnv();
}
const { hostname, port, password } =
  env !== "dev" && appEnv.services["redis"][0].credentials;

const PORT: Number | string = process.env.PORT || 3000;

const redis_client =
  env === "dev"
    ? redis.createClient({ port: 6379 })
    : redis.createClient({ host: hostname, port, password });

redis_client.set("message", "hell0 world");

const app: Application = express();

env === "dev" && app.use(cors());

app.use(bodyParser.json());

app.use(helmet());

app.use(
  "/api",
  graphqlHTTP({
    schema: Rschema,
    graphiql: env === "dev",
    context: {
      redis_client,
    },
  })
);

app.get("/redis_test", (req, res) => {
  res.send(hostname);
});

app.get("/env", (req, res) => {
  res.send(env);
});

app.listen(PORT, () => `Server started on port ${PORT}`);
