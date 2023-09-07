import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import sitterCardData from "./data/SitterCardData.js";
import sitterDetailRouter from "./routers/sittterDetail.js";
import dotenv from "dotenv";
import sitterRouter from "./routers/sitterRouter.js";

async function init() {
  const app = express();
  const port = 4000;
  dotenv.config();

  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/sitter", sitterDetailRouter);

  app.get("/search", (req, res) => {
    return res.json({
      data: sitterCardData,
    });
  });

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
