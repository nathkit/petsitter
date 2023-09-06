import { Router } from "express";
import pool from "../utils/db.js";
import bcrypt from "bcrypt";

const authRouter = Router();

// login router ****************************
authRouter.post("/login", async (req, res) => {
  const role = req.body.role;
  let query;
  let value = [req.body.email];
  if (role === "pet_owners") {
    query =
      "select pet_owner_email,pet_owner_password from pet_owner_profile where pet_owner_email = $1";
  } else {
    query =
      "select pet_sitter_email,pet_sitter_password from pet_sitter_profile where pet_sitter_email = $1";
  }

  try {
    // check email condition **********************
    const valid = await pool.query(query, value);

    if (!valid.rows.length) {
      return res.json({ message: "Invalid email!" });
    }
    // check password condition **********************
    const validPassword = await bcrypt.compare(
      req.body.password,
      valid.rows[0].pet_sitter_password
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
      "insert into pet_owner_profile(pet_owner_email,pet_owner_name,pet_owner_phone,pet_owner_password,created_at, updated_at)values($1,$2,$3,$4,$5,$6)";
  } else {
    query =
      "insert into pet_sitter_profile(pet_sitter_email,pet_sitter_name,pet_sitter_phone,pet_sitter_password,created_at, updated_at)values($1,$2,$3,$4,$5,$6)";
  }

  try {
    const result = pool.query(query, value);
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }

  return res.json({ message: "User profile has been created successfully" });
});

// reset password *****************************
authRouter.put("/resetPassword", async (req, res) => {
  // console.log(req.body);
  const user = { email: req.body.email, password: req.body.password };

  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);

  let query =
    "update pet_sitter_profile set pet_sitter_password = $2 where pet_sitter_email = $1";
  let value = Object.values(user);
  const result = await pool.query(query, value);
  if (result.rowCount === 0) {
    return res.json({ message: "Email does not exist." });
  }
  return res.json({ message: "Reset password successfully" });
});

export default authRouter;
