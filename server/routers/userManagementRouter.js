import { Router, response } from "express";
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
  user.updated_at = new Date();
  user.id = userId;
  let result;
  let url;
  try {
    const query = `update users set full_name = $1, email = $2, id_number = $3, phone = $4, date_of_birth = $5, image_name = $6, updated_at = $7 where id = $8`;
    const values = Object.values(user);
    // use supabase function for uploading **************************************
    if (req.files) {
      const respondesUpload = await supabaseUpload(
        req.files.avatarFile[0],
        user.avatarName
      );
      // splice avatarName out and reassige ************************************
      values.splice(5, 1, respondesUpload);
    } else {
      // splice avatarFile out ************************************
      values.splice(6, 1);
    }
    // update query ****************************************************************
    await pool.query(query, values);
    // user query after update *****************************************************
    const serverRespondes = await pool.query(
      `select * from users where id = $1`,
      [userId]
    );
    result = serverRespondes.rows[0];
    const data = supabase.storage
      .from("avatars")
      .getPublicUrl(result.image_name);
    url = data.data.publicUrl;
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }
  return res.json({
    message: "Updated user successfully.",
    data: {
      id: result.id,
      fullName: result.full_name,
      email: result.email,
      idNumber: result.id_number,
      phone: result.phone,
      dateOfbirth: result.date_of_birth,
      avatar: { avatarName: result.image_name, avatarUrl: url },
      sitterAuthen: result.sitter_authen,
    },
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

userManagementRouter.get("/:userId/pets/:petId", async (req, res) => {
  const userId = req.params.userId;
  const petId = req.params.petId;
  const query = `select *,pet_type.type 
  from pets
  inner join pet_type
  on pets.pet_type_id = pet_type.id
  where pets.user_id = $1 and pets.id = $2`;
  const values = [userId, petId];
  let result;
  let url;
  try {
    const response = await pool.query(query, values);
    result = response.rows[0];
    const data = supabase.storage
      .from("avatars")
      .getPublicUrl(result.image_name);
    url = data.data.publicUrl;
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }
  return res.json({
    message: "Fetch data successfully",
    data: {
      ...result,
      petAvatar: { petAvatarName: result.image_name, petAvatarUrl: url },
    },
  });
});

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

userManagementRouter.put(
  "/:userId/pets/:petId",
  avatarUpload,
  async (req, res) => {
    const pet = { ...req.body };
    pet.updated_at = new Date();
    pet.user_id = req.params.userId;
    pet.id = req.params.petId;
    let result;
    let url;
    try {
      const query = `UPDATE pets SET name = $1, pet_type_id = $2, breed = $3, sex = $4, age = $5, color = $6, weight = $7, description = $8, image_name = $9, updated_at = $10 WHERE user_id = $11 AND id = $12`;
      const values = Object.values(pet);
      // use supabase function for uploading **************************************
      if (req.files) {
        const respondesUpload = await supabaseUpload(
          req.files.avatarFile[0],
          pet.avatarName
        );
        // splice avatarName out and reassige ************************************
        values.splice(8, 1, respondesUpload);
      } else {
        // splice avatarFile out ************************************
        values.splice(9, 1);
      }
      // update query ****************************************************************
      await pool.query(query, values);
      // user query after update *****************************************************
      const serverRespondes = await pool.query(
        `select *,pet_type.type from pets inner join pet_type on pets.pet_type_id = pet_type.id where pets.user_id = $1 and pets.id = $2`,
        [pet.user_id, pet.id]
      );
      result = serverRespondes.rows[0];
      const data = supabase.storage
        .from("avatars")
        .getPublicUrl(result.image_name);
      url = data.data.publicUrl;
    } catch (err) {
      return res.json({ message: "Request error occurred" });
    }

    return res.json({
      message: "Your pet has been updated successfully",
      data: {
        ...result,
        petAvatar: { petAvatarName: result.image_name, petAvatarUrl: url },
      },
    });
  }
);

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
    const query = `SELECT * FROM bookings_history_detail WHERE user_id = $1;`;

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

// userManagementRouter.get("/:userId/booking/:bookingId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const bookingId = req.params.bookingId;
//     const query = `SELECT * FROM bookings_history WHERE user_id = $1 AND booking_no = $2;`;

//     const bookingById = await pool.query(query, [userId, bookingId]);
//     if (bookingById.rows.length === 0) {
//       return res.status(404).json({ message: "No available booking" });
//     }

//     return res.status(200).json({
//       data: bookingById.rows[0],
//       message: "Get detail successfully",
//     });
//   } catch (error) {
//     console.error("Error fetching booking history:", error);
//     return res.status(500).json({ message: "Request error occurred" });
//   }
// });

userManagementRouter.post(
  "/:userId/booking/:bookingId/review",
  async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const newReview = {
        ...req.body,
        created_at: new Date(),
      };
      console.log("Hello");
      await pool.query(
        `insert into sitter_reviews (booking_id, rating, comment, created_at)
        VALUES ($1, $2, $3, $4)`,
        [bookingId, newReview.rating, newReview.comment, newReview.created_at]
      );

      return res.json({
        message: "Rating has been created successfully",
        data: newReview,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Request error occurred" });
    }
  }
);

userManagementRouter.get(
  "/:userId/booking/:bookingId/review",
  async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const result = await pool.query(
        `select * from booking_reviews_by_user where booking_id = $1`,
        [bookingId]
      );

      if (result.rows.length === 0) {
        return res.status(500).json({ message: "Request error occurred" });
      }

      return res.json({
        message: "Get review successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Request error occurred" });
    }
  }
);

export default userManagementRouter;
