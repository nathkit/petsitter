import { Router } from "express";
import dotenv from "dotenv";
import Omise from "omise";

dotenv.config();

const omise = Omise({
  //   secretKey: process.env.Secret_Key,
  secretKey: "skey_test_5x5w3xsxg2gqel1tyx4", //TODO: move to env
  omiseVersion: "2019-05-29",
  //   publicKey: process.env.Public_Key,
});

const pamentGatewayRouter = Router();

pamentGatewayRouter.post("/", async (req, res) => {
  const { amount, token } = req.body;
  try {
    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      card: token.startsWith("tokn_") ? token : null,
      source: token.startsWith("tokn_") ? null : token,
      // return_uri: "http://localhost:5173",
    });
    console.log(charge);
    res.send({
      amount: charge.amount,
      status: charge.status,
      // authorize_uri: charge.authorize_uri,
    });
  } catch (error) {
    console.log(error, "error");
  }
});

export default pamentGatewayRouter;
