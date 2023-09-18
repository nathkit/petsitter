import { Router } from "express";
import pool from "../utils/db.js";
import multer from "multer";
import { supabase, supabaseUpload } from "../utils/supabase.js";

const userManagementRouter = Router();
const multerUpload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB in bytes
  },
});
const avatarUpload = multerUpload.fields([{ name: "avatarFile" }]);

userManagementRouter.put("/:userId", avatarUpload, async (req, res) => {
  const userId = req.params.userId;
  const user = { ...req.body };
  try {
    // use supabase function for uploading **************************************
    const respondes = await supabaseUpload(
      req.files.avatarFile[0],
      user.avatarName
    );
    user.avatarName = respondes;
    user.updated_at = new Date();
    const query = `update users set full_name = $1, email = $2, id_number = $3, phone = $4, date_of_birth = $5, image_name = $6, updated_at = $7 where id = $8`;
    const values = Object.values(user);
    values.splice(7, 1, userId);
    const result = await pool.query(query, values);
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }
  return res.json({
    message: "Updated user successfully.",
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
    FROM  pet_type
    inner join pets
    on pet_type.id = pets.pet_type_id
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

userManagementRouter.post("/:userId/pets", async (req, res) => {
  try {
    const userIdString = req.params.userId;
    const userId = parseInt(userIdString, 10);
    const newPet = {
      ...req.body,
      user_id: userId,
      created_at: new Date(),
    };
    console.log(newPet);
    const pets = await pool.query(
      `INSERT INTO pets (pet_type_id, user_id, image_path, name, breed, sex, age, color, weight, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        newPet.pet_type_id,
        newPet.user_id,
        newPet.image_path,
        newPet.name,
        newPet.breed,
        newPet.sex,
        newPet.age,
        newPet.color,
        newPet.weight,
        newPet.description,
        newPet.created_at,
        newPet.created_at,
      ]
    );
    console.log(pets);

    return res.json({
      message: "Your pet has been created successfully",
      data: pets,
    });
  } catch (error) {
    return res.status(500).json({ message: "Request error occurred" });
  }
});

userManagementRouter.put("/:userId/pets/:petId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const petId = req.params.petId;
    const updatedPet = {
      ...req.body,
      updated_at: new Date(),
    };

    const result = await pool.query(
      `UPDATE pets 
       SET pet_type_id = $1, image_path = $2, name = $3, breed = $4, sex = $5, age = $6, color = $7, weight = $8, description = $9, updated_at = $10
       WHERE user_id = $11 AND id = $12`,
      [
        updatedPet.pet_type_id,
        updatedPet.image_path,
        updatedPet.name,
        updatedPet.breed,
        updatedPet.sex,
        updatedPet.age,
        updatedPet.color,
        updatedPet.weight,
        updatedPet.description,
        updatedPet.updated_at,
        userId,
        petId,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Pet not found" });
    }

    return res.json({
      message: "Your pet has been updated successfully",
      data: updatedPet,
    });
  } catch (error) {
    return res.status(500).json({ message: "Request error occurred" });
  }
});

userManagementRouter.delete("/:userId/pets/:petId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const petId = req.params.petId;
    const query = `DELETE FROM pets
    WHERE user_id = $1 AND id = $2;`;
    const deletePetById = await pool.query(query, [userId, petId]);

    // if (deletePetById.rowCount === 0) {
    //   return res.status(500).json({ message: "Pet not found" });
    // }
    return res.json({
      data: deletePetById.rows,
      message: "Your pet has been deleted  successfully",
    });
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
    const query = `SELECT * FROM bookings_history_detail_updated WHERE user_id = $1;`;

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
      message: "Get detail successfully",
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
    const query = `SELECT * FROM bookings_history_detail_updated WHERE user_id = $1 AND booking_no = $2;`;

    const bookingById = await pool.query(query, [userId, bookingId]);
    if (bookingById.rows.length === 0) {
      return res.status(404).json({ message: "No available booking" });
    }

    return res.status(200).json({
      data: bookingById.rows[0],
      message: "Get detail successfully",
    });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

userManagementRouter.post(
  "/:userId/booking/:bookingId/review",
  async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const newReview = {
        ...req.body,
        created_at: new Date(),
      };
      await pool.query(
        `insert into sitter_reviews (booking_id, rating, comment, created_at)
              value ($1, $2, $3, $4)`,
        [bookingId, newReview.rating, newReview.comment, newReview.created_at]
      );

      return res.json({
        message: "Rating has been created successfully",
        data: newReview,
      });
    } catch (error) {
      return res.status(500).json({ message: "Request error occurred" });
    }
  }
);

export default userManagementRouter;
