import express, { Application, Request, Response, NextFunction } from "express";
import graphqlHTTP from "express-graphql";
// const expressGraphQL = require("express-graphql")
import Rschema from "./schema";
import cors from "cors";
import helmet from "helmet";
import cfenv from "cfenv";
require("dotenv").config();

import jwt from "jsonwebtoken";

const appEnv: any = cfenv.getAppEnv();
const env = process.env.NODE_ENV || "dev";

const authUser: any =
  env === "dev"
    ? process.env.USERNAME
    : appEnv.services["user-provided"][0].credentials.username;

const secretKey: string =
  env === "dev"
    ? process.env.SECRET
    : appEnv.services["user-provided"][0].credentials.secret;

const PORT: Number | string = process.env.PORT || 3000;
const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.post("/api/login", (req, res) => {
  const reqUsername = req.body.username;

  if (reqUsername === authUser) {
    const user = {
      authUser,
    };
    jwt.sign({ user }, secretKey, { expiresIn: "15m" }, (err, token) => {
      res.send({
        token,
      });
    });
  } else {
    res.status(401).send({
      title: "Unauthorised",
      message: "You are unauthorised to access this resource",
    });
  }
});

app.use(
  "/api",
  getToken,
  graphqlHTTP({
    schema: Rschema,
    graphiql: env === "dev",
  })
);

function getToken(req: any, res: any, next: any) {
  if (env === "dev") {
    next();
  } else {
    const bearerHeader = req.headers["authorization"];

    //check if not undefined
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;

      jwt.verify(req.token, secretKey, (err: any, authData: any) => {
        if (err) {
          res.status(401).send("Error, not authorised to access this resource");
        } else {
          next();
        }
      });
    } else {
      res.status(403).send("Error, no authorisation header");
    }
  }
}

app.listen(PORT, () => `Server started on port ${PORT}`);
