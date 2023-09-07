import { Router } from "express";
import pool from "../utils/db.js";
import bcrypt from "bcrypt";

const ownerRouter = Router();

// login router ****************************
ownerRouter.get("/:id", async (req, res) => {
  const ownerEmail = req.params.id;

  const result = await pool.query("select * from pet_owner_profile where pet_owner_email=$1", [ownerEmail])

  return res.json({
    data: result.rows[0]
  })
})

export default ownerRouter;
