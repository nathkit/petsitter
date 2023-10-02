import { Router, response } from "express";
import pool from "../utils/db.js";
import { supabase, supabaseUpload } from "../utils/supabase.js";
import { fileUpload } from "../utils/multerUpload.js";
const userManagementRouter = Router();

userManagementRouter.put("/:userId", fileUpload, async (req, res) => {
  const userId = req.params.userId;

  // check id number condition ******************************************
  const checkIdNumber = await pool.query(
    "select id_number from users where id_number = $1 and id != $2",
    [req.body.idNumber, userId]
  );
  if (checkIdNumber.rows.length) {
    return res.json({ message: "Id numbers has been already used!" });
  }

  const user = { ...req.body };
  // reassign user.dateOfBirth to be UTC+7 *********************************
  const dateOfBirth = new Date(user.dateOfBirth);
  dateOfBirth.setHours(dateOfBirth.getHours() + 7);
  user.dateOfBirth = dateOfBirth;

  user.avatarName ? null : (user.avatarName = null);
  user.updated_at = new Date();
  user.id = userId;
  let result;
  try {
    const query = `update users set full_name = $1, email = $2, id_number = $3, phone = $4, date_of_birth = $5, image_name = $6, ${
      req.files
        ? "profile_image_path = $7, updated_at = $8 where id = $9"
        : "updated_at = $7 where id = $8"
    }`;
    const values = Object.values(user);
    // use supabase function for uploading **************************************
    if (req.files) {
      const { avatarName, url } = await supabaseUpload(
        req.files.avatarFile[0],
        user.avatarName
      );
      // console.log({ avatarName, url });
      // splice avatarName out and reassige ************************************
      values.splice(5, 1, avatarName, url);
    } else {
      // splice avatarFile out ************************************
      values.splice(6, 1);
    }
    // update query ****************************************************************
    await pool.query(query, values);
    // user query after update *****************************************************
    const serverRespondes = await pool.query(
      "select * from user_login where id = $1",
      [userId]
    );
    result = serverRespondes.rows[0];
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
      image_name: result.image_name,
      image_path: result.profile_image_path,
      sitter_id: result.pet_sitter_id,
      sitter_image_name: result.pet_sitter_image_name,
      sitter_image_path: result.pet_sitter_profile_image_path,
      sitter_authen: result.sitter_authen,
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
  try {
    const response = await pool.query(query, values);
    result = response.rows[0];
  } catch (err) {
    return res.json({ message: "Server is error!" });
  }
  // console.log(result);
  // console.log("first");
  return res.json({
    message: "Fetch data successfully",
    data: result,
  });
});

userManagementRouter.post("/:userId/pets", fileUpload, async (req, res) => {
  const pet = { ...req.body };
  pet.avatarName = null;
  pet.updated_at = new Date();
  pet.created_at = new Date();
  pet.userId = req.params.userId;
  try {
    let query = `INSERT INTO pets (name, pet_type_id, breed, sex, age, color, weight, description, image_name, image_path, created_at, updated_at,user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
    let values = Object.values(pet);
    // use supabase function for uploading **************************************
    if (req.files) {
      const { avatarName, url } = await supabaseUpload(
        req.files.avatarFile[0],
        pet.avatarName,
        pet.breed
      );
      // console.log(values);
      // splice avatarName out and reassige ************************************
      values.splice(8, 1, avatarName, url);
      // console.log(values);
      // query = `INSERT INTO pets (name, pet_type_id, breed, sex, age, color, weight, description, image_name, image_path, created_at, updated_at,user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
    } else {
      // splice avatarFile out *********************************************
      values.splice(8, 2, "none", "none");
    }
    // insert query ****************************************************************
    await pool.query(query, values);
  } catch (error) {
    return res.status(500).json({ message: "Request error occurred" });
  }
  return res.json({
    message: "Your pet has been created successfully",
  });
});

userManagementRouter.put(
  "/:userId/pets/:petId",
  fileUpload,
  async (req, res) => {
    const pet = { ...req.body };
    pet.updated_at = new Date();
    pet.user_id = req.params.userId;
    pet.id = req.params.petId;
    let result;
    try {
      const query = `UPDATE pets SET name = $1, pet_type_id = $2, breed = $3, sex = $4, age = $5, color = $6, weight = $7, description = $8, image_name = $9, ${
        //query condition **********************************************
        req.files
          ? "image_path = $10, updated_at = $11 WHERE user_id = $12 AND id = $13"
          : "updated_at = $10 WHERE user_id = $11 AND id = $12"
      }`;
      const values = Object.values(pet);
      // use supabase function for uploading **************************************
      // console.log(pet);
      // console.log(values);
      if (req.files) {
        const { avatarName, url } = await supabaseUpload(
          req.files.avatarFile[0],
          pet.avatarName,
          pet.breed
        );
        // splice avatarName out and reassign ************************************
        values.splice(8, 1, avatarName, url);
      } else {
        values.splice(9, 1);
      }
      // console.log(values);
      // update query ****************************************************************
      await pool.query(query, values);
      // user query after update *****************************************************
      const serverRespondes = await pool.query(
        `select *,pet_type.type from pets inner join pet_type on pets.pet_type_id = pet_type.id where pets.user_id = $1 and pets.id = $2`,
        [pet.user_id, pet.id]
      );
      result = serverRespondes.rows[0];
    } catch (err) {
      return res.json({ message: "Request error occurred" });
    }
    return res.json({
      message: "Your pet has been updated successfully",
      data: result,
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
    const query = `SELECT * FROM bookings_history_detail WHERE user_id = $1 ORDER BY booking_no DESC;`;

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

userManagementRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await pool.query(
      `select * from user_modal where user_ids = $1`,
      [userId]
    );

    return res.json({
      message: "Get review successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

export default userManagementRouter;
