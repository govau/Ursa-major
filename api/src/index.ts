import express, { Application } from "express";
import graphqlHTTP from "express-graphql";
// const expressGraphQL = require("express-graphql")
import Rschema from "./schema";
import cors from "cors";
import helmet from "helmet";

const PORT: Number | string = process.env.PORT || 3000;
const app: Application = express();
app.use(cors());
app.use(helmet());

app.use(
  "/api",
  graphqlHTTP({
    schema: Rschema,
    graphiql: true,
  })
);

app.listen(PORT, () => `Server started on port ${PORT}`);
