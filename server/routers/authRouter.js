import { Router } from "express";
import pool from "../utils/db.js";
import bcrypt from "bcrypt";

const authRouter = Router();

// login router ****************************
authRouter.post("/login", async (req, res) => {
  const role = req.body.role;
  let query = "select * from users where email = $1";
  let value = [req.body.email];
  let result;
  try {
    // check email condition **********************
    const valid = await pool.query(query, value);
    // console.log(valid.rows[0]);
    if (!valid.rows.length) {
      return res.json({ message: "Invalid email!" });
    }
    // check password condition **********************
    const resPassword = valid.rows[0].password;
    const validPassword = await bcrypt.compare(req.body.password, resPassword);
    if (!validPassword) {
      return res.json({ message: "Invalid password!" });
    }
    result = valid.rows[0];
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }
  // send user data back to client *******************************
  return res.json({
    message: "User has been verified successfully",
    data: {
      id: result.id,
      fullName: result.full_name,
      email: result.email,
      idNumber: result.id_number,
      phone: result.phone,
      dateOfbirth: result.date_of_birth,
      avatar: result.profile_image_path,
      sitterAuthen: result.sitter_authen,
    },
  });
});

// register router ****************************
authRouter.post("/register", async (req, res) => {
  // check same email condition first *************************
  let checkEmailQuery = "select email from users where email = $1";
  const checkEmail = await pool.query(checkEmailQuery, [req.body.email]);
  if (checkEmail.rows.length) {
    return res.json({ message: "Email has been already used!" });
  }

  const created_at = new Date();
  const updated_at = new Date();
  const user = {
    email: req.body.email,
    name: req.body.fullName,
    phone: req.body.phone,
    password: req.body.password,
    created_at,
    updated_at,
  };
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  const query = `insert into users(email,full_name,phone,password,created_at, updated_at)
                 values($1,$2,$3,$4,$5,$6)`;
  const value = Object.values(user);
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

  // query condition **************************
  // console.log(req.body.role);
  let query = `update users set password = $2 where email = $1`;
  let value = Object.values(user);
  try {
    const result = await pool.query(query, value);
    // console.log(result);
    if (result.rowCount === 0) {
      return res.json({ message: "Email does not exist." });
    }
  } catch (err) {
    return res.json({ message: "Email does not exist." });
  }

  return res.json({ message: "Reset password successfully" });
});

export default authRouter;
