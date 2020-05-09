import express, { Application } from "express";
import graphqlHTTP from "express-graphql";
// const expressGraphQL = require("express-graphql")
import Rschema from "./schema";
import cors from "cors";
import helmet from "helmet";
import redis from "redis";

import bodyParser from "body-parser";

const PORT: Number | string = process.env.PORT || 3000;

const client = redis.createClient({ port: 6379 });
const app: Application = express();
app.use(bodyParser.json());

var env = process.env.NODE_ENV || "dev";
env === "dev" && app.use(cors());
app.use(helmet());

const getRedis = (req: any, res: any, next: any) => {
  client.get("name", (err, res) => {
    console.log(res);
  });

  next();
};

app.use(
  "/api",
  graphqlHTTP((req) => ({
    schema: Rschema,
    graphiql: env === "dev",
    context: {
      client,
      req,
    },
  }))
);

app.listen(PORT, () => `Server started on port ${PORT}`);
