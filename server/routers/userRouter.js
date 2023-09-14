import { Router } from "express";
import pool from "../utils/db.js";

const userRouter = Router();

// get detail by id
userRouter.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const query = `update users set full_name = $1, email = $2, id_number = $3, phone = $4, date_of_birth = $5, profile_image_path = $6 where id = $7`;
  const values = Object.values(req.body);
  values.push(userId);
  // console.log(values);
  try {
    const result = await pool.query(query, values);
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }
  return res.json({
    message: "Fetch data successfully test",
  });
});

export default userRouter;
