import express, { Application } from "express";
import graphqlHTTP from "express-graphql";
// const expressGraphQL = require("express-graphql")
import Rschema from "./schema";
import cors from "cors";
import helmet from "helmet";

const PORT: Number | string = process.env.PORT || 3000;
const app: Application = express();
var env = process.env.NODE_ENV || "dev";
env === "dev" && app.use(cors());
app.use(helmet());

app.use(
  "/api",
  graphqlHTTP({
    schema: Rschema,
    graphiql: env === "dev",
  })
);

app.listen(PORT, () => `Server started on port ${PORT}`);
