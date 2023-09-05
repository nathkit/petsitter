import { Router } from "express";
import pool from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();

// login router ****************************
authRouter.post("/login", async (req, res) => {
  let query = "select email,password from user_profile where email = $1";
  let value = [req.body.email];
  try {
    // check email condition **********************
    const valid = await pool.query(query, value);
    if (!valid.rows.length) {
      return res.json({ message: "Invalid email!" });
    }
    // check password condition **********************
    const validPassword = await bcrypt.compare(
      req.body.password,
      valid.rows[0].password
    );
    if (!validPassword) {
      return res.json({ message: "Invalid password!" });
    }
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }
  return res.json({
    message: "User profile has been verified successfully",
  });
});

// register router ****************************
authRouter.post("/register", async (req, res) => {
  // console.log(req.body);
  const created_at = new Date();
  const updated_at = new Date();

  const user = {
    email: req.body.email,
    fullName: req.body.fullName,
    phone: req.body.phone,
    password: req.body.password,
    created_at,
    updated_at,
  };

  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);

  // query manage **************************
  let query;
  let value = Object.values(user);

  // console.log(value);
  // query condition **************************
  if (req.body.role === "pet_owners") {
    query =
      "insert into user_profile(email,full_name,phone_number,password,created_at, updated_at)values($1,$2,$3,$4,$5,$6)";
  }
  if (req.body.role === "pet_sitters") {
    query =
      "insert into sitter_profile(sitter_email,sitter_name,sitter_phone_number,password,created_at, updated_at)values($1,$2,$3,$4,$5,$6)";
  }

  try {
    const result = pool.query(query, value);
    console.log(result);
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }

  return res.json({ message: "User profile has been created successfully" });
});

export default authRouter;
