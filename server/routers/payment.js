import { Router } from "express";
import dotenv from "dotenv";
import Omise from "omise";
import express from "express";

dotenv.config();

// const app = express();
// const server = app.listen(5000);
// server.timeout = 50000;

const omise = Omise({
  secretKey: process.env.SECRET_KEY_OMISE,
  // secretKey: "skey_test_5x5w3xsxg2gqel1tyx4", //TODO: move to env
  omiseVersion: "2019-05-29",
  //   publicKey: process.env.Public_Key,
});

const pamentGatewayRouter = Router();

pamentGatewayRouter.post("/", async (req, res) => {
  const { amount, token } = req.body;

  if (!token) {
    return res.status(404).json({ message: "token not found" });
  }

  if (!amount) {
    return res.status(404).json({ message: "amount not found" });
  }

  try {
    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      card: token.startsWith("tokn_") ? token : null,
      // source: token.startsWith("tokn_") ? null : token,
      // return_uri: "http://localhost:5173",
    });
    console.log(charge);
    // return res.json({
    //   amount: charge.amount,
    //   status: charge.status,
    //   // authorize_uri: charge.authorize_uri,
    // });
    // try {
    if (charge.status === "successful") {
      return res.status(200).json({ message: "successful" });
    } else {
      return res.status(400).json({ message: "failed" });
    }
    // if (charge.status === "failed") {
    //   return res.status(400).json({ message: "failed" });
    // }
    // } catch (error) {
    //   return res.status(404).json({ message: "Can't Payment" });
    // }
  } catch (error) {
    console.log(error, "error");
  }
});

export default pamentGatewayRouter;
