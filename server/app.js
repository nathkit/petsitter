import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import sitterDetailRouter from "./routers/sittterDetail.js";
import dotenv from "dotenv";
import sitterRouter from "./routers/sitterRouter.js";
import ownerRouter from "./routers/ownerRouter.js"

async function init() {
  const app = express();
  const port = 4000;
  dotenv.config();

  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.use("/account", ownerRouter)

  app.use("/sitter", sitterDetailRouter);

  // sitterRouter

  app.use("/sitter", sitterRouter);

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  // authRouter under this line cannot use .GET ******************
  app.use("/auth", authRouter);
}

init();
