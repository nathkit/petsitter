import { Router } from "express";
import pool from "../utils/db.js";

const userManagementRouter = Router();

userManagementRouter.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = { ...req.body };
  try {
    const query = `update users set full_name = $1, email = $2, id_number = $3, phone = $4, date_of_birth = $5, image_name = $6 where id = $7`;
    const values = Object.values(user);
    values.splice(6, 1, userId);
    const result = await pool.query(query, values);
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }
  return res.json({
    message: "Updated user successfully.",
  });
});

userManagementRouter.get("/:userId/pets", async (req, res) => { });

userManagementRouter.get("/:userId/pets/:petId", async (req, res) => { });

userManagementRouter.post("/:userId/pets", async (req, res) => { });

userManagementRouter.put("/:userId/pets/:petId", async (req, res) => { });

userManagementRouter.delete("/:userId/pets/:petId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const petId = req.params.petId;
    const query = `DELETE FROM pets
    WHERE user_id = $1 AND id = $2;`
    const deletePetById = await pool.query(query, [userId, petId]);

    // if (deletePetById.rowCount === 0) {
    //   return res.status(500).json({ message: "Pet not found" });
    // }
    return res.json({ 
      data: deletePetById.rows,
      message:  "Your pet has been deleted  successfully"
     })
    
  } catch (error) {
    console.error("Error to delete:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

userManagementRouter.get("/:userId/booking", async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const dataPerPage = 5;
    const query = `SELECT * FROM bookings_history_detail WHERE user_id = $1;`

    const bookingHistory = await pool.query(query, [userId]);
    const totalData = bookingHistory.rows.length;
    const totalPages = Math.ceil(totalData / dataPerPage);
    const skip = (page - 1) * dataPerPage;
    const end = skip + dataPerPage;

    if (bookingHistory.rows.length === 0) {
      return res.status(404).json({ message: "No available booking" });
    }

    const paginatedBookingHistory = bookingHistory.rows.slice(skip, end);

    return res.status(200).json({
      data: paginatedBookingHistory,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        dataPerPage: dataPerPage,
        totalData: totalData,
      },
      message: "Get detail successfully"
    });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

userManagementRouter.get("/:userId/booking/:bookingId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookingId = req.params.bookingId;
    const query = `SELECT * FROM bookings_history_detail WHERE user_id = $1 AND booking_no = $2;`

    const bookingById = await pool.query(query, [userId, bookingId]);
    if (bookingById.rows.length === 0) {
      return res.status(404).json({ message: "No available booking" });
    }

    return res.status(200).json({
      data: bookingById.rows[0],
      message: "Get detail successfully"
    });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

userManagementRouter.post(
  "/:userId/booking/:bookingId/review",
  async (req, res) => { }
);

export default userManagementRouter;
