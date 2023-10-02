import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import dotenv from "dotenv";
import sitterManagementRouter from "./routers/sitterManagementRouter.js";
import userManagementRouter from "./routers/userManagementRouter.js";
import bookingRouter from "./routers/bookingRouter.js";
import pamentGatewayRouter from "./routers/payment.js";
async function init() {
  const app = express();
  const port = 4000;
  dotenv.config();

  const logger = (req, res, next) => {
    console.log(`${req.method} :  ${req.url} `);
    next();
  };

  // app.use(logger);

  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // sitterRouter
  app.use("/sitterManagement", sitterManagementRouter);
  // userRouter
  app.use("/userManagement", userManagementRouter);
  // bookingRouter
  app.use("/booking", bookingRouter);
  // authRouter
  app.use("/auth", authRouter);
  //pamentGatewayRouter
  app.use("/pamentGateway", pamentGatewayRouter);

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
