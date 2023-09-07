import { Router } from "express";
import pool from "../utils/db.js";
import bcrypt from "bcrypt";

const ownerRouter = Router();

// get detail by id
ownerRouter.get("/:id", async (req, res) => {
  const ownerEmail = req.params.id;
  try {
    const result = await pool.query("select * from pet_owner_profile where pet_owner_email=$1", [ownerEmail])
    return res.json({
      test: "hello",
      data: result.rows[0]
    })

  } catch (error) {
    return res.json({
      error: error
    })
  }

})

ownerRouter.get("/", async (req, res) => {
  const ownerEmail = req.params.id;

  try {

    const result = await pool.query("select * from pet_owner_profile")

    return res.json({
      data: result
    })
  } catch (error) {
    return res.json({
      error: error
    })
  }
})


export default ownerRouter;
