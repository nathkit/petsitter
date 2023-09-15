import { Router } from "express";
import pool from "../utils/db.js";

const userManagementRouter = Router();

userManagementRouter.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const query = `update users set full_name = $1, email = $2, id_number = $3, phone = $4, date_of_birth = $5, profile_image_path = $6 where id = $7`;
  const values = Object.values(req.body);
  values.push(userId);
  console.log(userId);
  try {
    const result = await pool.query(query, values);
    console.log(result);
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }
  return res.json({
    message: "Fetch data successfully test",
  });
});

userManagementRouter.get("/:userId/pets", async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Please specified user id in order to get the pets",
    });
  }
  try {
    const result = await pool.query(
      `SELECT * 
    FROM  pets
    inner join pet_type
    on pets.pet_type_id = pet_type.id
    where user_id=$1`,
      [userId]
    );
    return res.status(200).json({
      data: result.rows,
      message: "Get detail successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Request error occurred",
    });
  }
});

userManagementRouter.get("/:userId/pets/:petId", async (req, res) => {});

userManagementRouter.post("/:userId/pets", async (req, res) => {});

userManagementRouter.put("/:userId/pets/:petId", async (req, res) => {});

userManagementRouter.delete("/:userId/pets/:petId", async (req, res) => {});

userManagementRouter.get("/:userId/booking", async (req, res) => {});

userManagementRouter.get("/:userId/booking/:bookingId", async (req, res) => {});

userManagementRouter.post(
  "/:userId/booking/:bookingId/review",
  async (req, res) => {}
);

export default userManagementRouter;
