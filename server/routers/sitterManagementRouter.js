import { Router } from "express";
import { getPagingData } from "../utils/pagination.js";
import pool from "../utils/db.js";
import { fileUpload } from "../utils/multerUpload.js";
import { supabaseUpload, supabaseMultiUpload } from "../utils/supabase.js";

const sitterManagementRouter = Router();

sitterManagementRouter.get("/", async (req, res) => {
  try {
    const PAGE_SIZE = 5;

    const search = req.query.search || "";
    let petType = req.query.petType || "";
    const rate = req.query.rate || "";
    const exp = req.query.exp || 3;
    const page = req.query.page || 1;
    const limit = req.query.limit || PAGE_SIZE;
    const offset = (page - 1) * limit;

    let query = `SELECT * FROM pet_sitter_view`;
    let value = [];
    let condition = [];

    if (search) {
      condition.push(
        `(Lower(trade_name) like $` +
          (value.length + 1) +
          ` or Lower(address_detail) like $` +
          (value.length + 1) +
          ` or Lower(district) like $` +
          (value.length + 1) +
          ` or Lower(sub_district) like $` +
          (value.length + 1) +
          `  or Lower(province) like $` +
          (value.length + 1) +
          ` )`
      );
      value.push(`%` + search.toLowerCase() + `%`);
    }

    if (petType) {
      petType = petType.split(`,`);
      if (petType.length > 0) {
        if (petType.length > 0) {
          const petTypeConditions = petType.map(
            (type) => `pet_type LIKE '%${type}%'`
          );
          condition.push(`(` + petTypeConditions.join(` and `) + `)`);
        }
      }
    }

    if (rate) {
      condition.push(`avg_rating = $` + (value.length + 1) + ``);
      value.push(rate);
    }

    if (exp == 0) {
      condition.push(`experience <= 2`);
    } else if (exp == 1) {
      condition.push(`experience > 2 and experience <= 5`);
    } else if (exp == 2) {
      condition.push(`experience > 5`);
    }

    if (condition.length > 0) {
      query += ` where ` + condition.join(` and `);
    }
    const paginationResult = await pool.query(query, value);

    query += ` limit ${limit} offset ${offset}`;

    // console.log(query);

    const result = await pool.query(query, value);

    const rows = result.rows;
    const total = paginationResult.rows.length;
    const pagination = getPagingData(total, page, limit);

    const parseTypeRows = rows.map((e) => {
      const types = e.pet_type.split(",");
      return {
        ...e,
        pet_type: types,
      };
    });

    const tradeImageRows = parseTypeRows.map((e) => {
      const tradeImage = e.trade_image_path.split(",");
      return {
        ...e,
        trade_image_path: tradeImage,
      };
    });

    return res.json({
      message: "Get detail successfully",
      data: tradeImageRows,
      paging: pagination,
    });
  } catch (error) {
    console.error("Error fetching sitter details:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

sitterManagementRouter.post("/", fileUpload, async (req, res) => {
  try {
    let result;
    // update user first *************************************************************
    const user = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      updated_at: new Date(),
      sitter_authen: true,
      userId: req.body.userId,
    };

    const userQuery = `UPDATE users set full_name = $1, phone = $2, email = $3, updated_at = $4, sitter_authen = $5 where id = $6`;
    const userValues = Object.values(user);
    const updateUserResult = await pool.query(userQuery, userValues);

    //--------------------------------------------------------------------------
    // create pet_sitter ***********************************************************

    const sitterQuery = `insert into pet_sitter(experience,introduction,trade_name,service_description,place_description,address_detail,district,province,sub_district,post_code,user_id,created_at,updated_at,image_name,profile_image_path)
                     values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING id`;

    const sitterValues = Object.values(req.body);
    sitterValues.splice(0, 4);
    sitterValues.splice(11);
    sitterValues.push(new Date(), new Date());

    // // upload avatar ************************************************************
    const { avatarName, url } = await supabaseUpload(
      req.files.avatarFile[0],
      req.body.avatarName
    );
    sitterValues.push(avatarName, url);

    // console.log(sitterValues);
    const createSitterResult = await pool.query(sitterQuery, sitterValues);
    const petSitterId = createSitterResult.rows[0].id;

    //--------------------------------------------------------------------------------
    // insert to pet_sitter_trade_images *******************************************
    const imageGallery = await supabaseMultiUpload(
      req.files.imageGalleryFile,
      petSitterId
    );

    for (let item of imageGallery) {
      const tradeImageRespondes = await pool.query(
        `insert into pet_sitter_trade_images(pet_sitter_id,trade_image_name,trade_image_path)
       values($1,$2,$3)`,
        [petSitterId, item.fileName, item.url]
      );
    }
    // // //----------------------------------------------------------------------------
    // // // create pet type ************************************************************

    const petType = req.body.petType.split(",");
    console.log(petType);
    // reassign pet type condition ******************************************
    const newPetType = petType.map((item) => {
      item === "Dog"
        ? (item = 1)
        : item === "Cat"
        ? (item = 2)
        : item === "Bird"
        ? (item = 3)
        : item === "Rabbit"
        ? (item = 4)
        : null;
      return item;
    });
    const length = newPetType.length;
    const petTypeQuery = `insert into pet_sitter_pet_type(pet_sitter_id,pet_type_id)
                     values${
                       length === 1
                         ? "($1,$2)"
                         : length === 2
                         ? "($1,$2),($1,$3)"
                         : length === 3
                         ? "($1,$2),($1,$3),($1,$4)"
                         : length === 4
                         ? "($1,$2),($1,$3),($1,$4),($1,$5)"
                         : null
                     }`;
    newPetType.unshift(petSitterId);
    const petTypeRusult = await pool.query(petTypeQuery, newPetType);

    //-----------------------------------------------------------------------------------
    const serverRespondes = await pool.query(
      `select users.phone,users.full_name,users.email,users.id_number,users.date_of_birth,users.image_name,users.profile_image_path,users.sitter_authen,pet_sitter.user_id,pet_sitter.id
     ,pet_sitter.profile_image_path as sitter_image_path,pet_sitter.image_name as sitter_image_name from users inner join pet_sitter on users.id = pet_sitter.user_id where pet_sitter.id = $1`,
      [petSitterId]
    );
    result = serverRespondes.rows[0];
    return res.json({
      message: "Sitter Profile has been created successfully",
      data: {
        id: result.user_id,
        fullName: result.full_name,
        email: result.email,
        idNumber: result.id_number,
        phone: result.phone,
        dateOfbirth: result.date_of_birth,
        image_name: result.image_name,
        image_path: result.profile_image_path,
        sitter_authen: result.sitter_authen,
        sitter_id: result.id,
        sitter_image_path: result.sitter_image_path,
        sitter_image_name: result.sitter_image_name,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Request error occurred" });
  }
});

sitterManagementRouter.get("/getSitterData/:sitterId", async (req, res) => {
  let result;
  try {
    const respondes = await pool.query(
      `SELECT * FROM pet_sitter_view WHERE id = $1;`,
      [req.params.sitterId]
    );
    result = respondes.rows[0];
  } catch (err) {
    return res.status(500).json({ message: "Request error occurred" });
  }
  return res.json({
    message: "Fetch sitter data successfully",
    data: result,
  });
});

sitterManagementRouter.get("/:sitterId", async (req, res) => {
  try {
    const sitterId = req.params.sitterId;

    const queryForDetail = `SELECT * FROM pet_sitter_view WHERE id = $1;`;

    const sitterDetails = await pool.query(queryForDetail, [sitterId]);

    return res.status(200).json({
      data: sitterDetails.rows,
    });
  } catch (error) {
    console.error("Error fetching sitter details:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

sitterManagementRouter.put("/:sitterId", fileUpload, async (req, res) => {
  try {
    let result;
    // console.log(req.body);
    // console.log(req.files);
    // update user first *************************************************************
    const user = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      updated_at: new Date(),
      sitter_authen: true,
      userId: req.body.userId,
    };

    const userQuery = `UPDATE users set full_name = $1, phone = $2, email = $3, updated_at = $4, sitter_authen = $5 where id = $6`;
    const userValues = Object.values(user);
    const updateUserResult = await pool.query(userQuery, userValues);

    // //--------------------------------------------------------------------------
    // // update pet_sitter ***********************************************************

    const sitterQuery = `update pet_sitter set experience = $1,introduction = $2,trade_name = $3,service_description = $4,place_description = $5,address_detail = $6,district = $7,province = $8,sub_district = $9,post_code = $10,user_id = $11,created_at = $12,updated_at = $13 
  ${
    req.files?.avatarFile
      ? ",image_name = $15,profile_image_path = $16 where id = $14"
      : " where id = $14"
  }`;
    const sitterValues = Object.values(req.body);
    sitterValues.splice(0, 5);
    sitterValues.splice(11);
    sitterValues.push(new Date(), new Date(), req.params.sitterId);

    // // // upload avatar ************************************************************
    if (req.files?.avatarFile) {
      // console.log("knkn");
      const { avatarName, url } = await supabaseUpload(
        req.files.avatarFile[0],
        req.body.avatarName
      );
      sitterValues.push(avatarName, url);
    }
    // console.log(sitterQuery);
    // console.log(sitterValues);
    const createSitterResult = await pool.query(sitterQuery, sitterValues);
    // console.log("nnnnn");
    // //--------------------------------------------------------------------------------
    // // insert to pet_sitter_trade_images *******************************************
    const imageGalleryName = req.body.imageGalleryName.split(",");
    // console.log("n1");
    const tradeImageRemove = await pool.query(
      `DELETE FROM pet_sitter_trade_images WHERE pet_sitter_id = $1 AND trade_image_name NOT IN (SELECT unnest($2::text[]))`,
      [req.params.sitterId, imageGalleryName]
    );
    // console.log("n2");
    if (req.files?.imageGalleryFile) {
      // console.log("in1");
      const imageGallery = await supabaseMultiUpload(
        req.files.imageGalleryFile,
        req.params.sitterId,
        imageGalleryName
      );
      // console.log("in2");
      // console.log(imageGallery);
      for (let item of imageGallery) {
        const tradeImageRespondes = await pool.query(
          `insert into pet_sitter_trade_images(pet_sitter_id,trade_image_name,trade_image_path)
         values($1,$2,$3)`,
          [req.params.sitterId, item.fileName, item.url]
        );
      }
      // console.log("in3");
    } else {
      const imageGallery = await supabaseMultiUpload(
        null,
        req.params.sitterId,
        imageGalleryName
      );
      // console.log("in4");
    }
    // // // //----------------------------------------------------------------------------
    // // // // create pet type ************************************************************
    // console.log("n3");
    const petType = req.body.petType.split(",");
    // console.log(petType);
    // delete pet type condition ******************************************
    const deleteResult = await pool.query(
      `DELETE FROM pet_sitter_pet_type WHERE pet_sitter_id = $1`,
      [req.params.sitterId]
    );

    const petTypeMapping = {
      Dog: 1,
      Cat: 2,
      Bird: 3,
      Rabbit: 4,
    };

    const newPetType = petType.map((item) => petTypeMapping[item] || null);

    const insertQuery = `INSERT INTO pet_sitter_pet_type (pet_sitter_id, pet_type_id)
  VALUES 
    ${newPetType.map((_, index) => `($1, $${index + 2})`).join(", ")}
`;
    const insertValues = [req.params.sitterId, ...newPetType];
    const insertResult = await pool.query(insertQuery, insertValues);

    console.log("done");

    // //-----------------------------------------------------------------------------------
    const serverRespondes = await pool.query(
      `select users.phone,users.full_name,users.email,users.id_number,users.date_of_birth,users.image_name,users.profile_image_path,users.sitter_authen,pet_sitter.user_id,pet_sitter.id
     ,pet_sitter.profile_image_path as sitter_image_path,pet_sitter.image_name as sitter_image_name from users inner join pet_sitter on users.id = pet_sitter.user_id where pet_sitter.id = $1`,
      [req.params.sitterId]
    );
    const sitterResPondes = await pool.query(
      `SELECT * FROM pet_sitter_view WHERE id = $1;`,
      [req.params.sitterId]
    );

    result = serverRespondes.rows[0];
    return res.json({
      message: "Sitter Profile has been updated successfully",
      userData: {
        id: result.user_id,
        fullName: result.full_name,
        email: result.email,
        idNumber: result.id_number,
        phone: result.phone,
        dateOfbirth: result.date_of_birth,
        image_name: result.image_name,
        image_path: result.profile_image_path,
        sitter_authen: result.sitter_authen,
        sitter_id: result.id,
        sitter_image_path: result.sitter_image_path,
        sitter_image_name: result.sitter_image_name,
      },
      sitterData: sitterResPondes.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: "Request error occurred" });
  }
});

sitterManagementRouter.get("/:sitterId/booking/", async (req, res) => {
  const sitterId = req.params.sitterId;
  const searchKeywords = req.query.searchKeywords || "";
  const status = req.query.status ? req.query.status.split(",") : [];
  const page = req.query.page || 1;
  const pageSize = 8;
  const offset = (page - 1) * pageSize;

  // console.log("search: ", searchKeywords);
  // console.log("status: ", status);
  // console.log("sitterId: ", sitterId);
  // console.log("search: ", searchKeywords);
  // console.log("status: ", status);
  // console.log("sitterId: ", sitterId);

  let query = `
    SELECT distinct booking_no, user_full_name, pet_ids, duration, start_date_time, end_date_time, statuses
    FROM bookings_history_detail 
    WHERE id = $1
  `;
  let values = [sitterId];

  let countQuery = `SELECT COUNT(*) FROM bookings_history_detail WHERE id = $1`;
  let countValues = [sitterId];

  if (searchKeywords) {
    query += `
      AND (user_full_name ILIKE $${values.length + 1}
      OR start_date_time::text ILIKE $${values.length + 1}
      OR end_date_time::text ILIKE $${values.length + 1})
    `;
    values.push(`%${searchKeywords}%`);

    countQuery += `
    AND (user_full_name ILIKE $${countValues.length + 1}
      OR start_date_time::text ILIKE $${countValues.length + 1}
      OR end_date_time::text ILIKE $${countValues.length + 1})
      `;
    countValues.push(`%${searchKeywords}%`);
  }

  if (status.length) {
    query += `
      AND statuses IN (${status
        .map((_, index) => `$${values.length + index + 1}`)
        .join(",")})
    `;
    values.push(...status);
    countQuery += `
      AND statuses IN (${status
        .map((_, index) => `$${countValues.length + index + 1}`)
        .join(",")})
    `;
    countValues.push(...status);
  }

  query += `
    ORDER BY booking_no DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;
  values.push(pageSize, offset);

  // console.log(query);
  try {
    // console.log("query is", query);
    // console.log("values is", values)
    const results = await pool.query(query, values);
    const totalCountRes = await pool.query(countQuery, countValues);

    const totalCount = parseInt(totalCountRes.rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / pageSize);
    console.log(totalCount);
    // console.log("TotalRows:", results.rows.length);
    // console.log("TotalRows:", results.rows);
    console.log("total Page:", totalPages);
    return res.status(200).json({
      message: "Get detail successfully",
      data: results.rows,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

sitterManagementRouter.get(
  "/:sitterId/sitterBookingList/:bookingId",
  async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const sitterId = req.params.sitterId;

      let query =
        "select * from bookings_user where booking_id = $1 and pet_sitter_id = $2";
      let value = [bookingId, sitterId];

      const result = await pool.query(query, value);

      const rows = result.rows;

      const newResult = rows.map((e) => {
        const pet_name = e.pet_names.split(",");
        const pet_id = e.pet_id.split(",");
        return {
          ...e,
          pet_names: pet_name,
          pet_id: pet_id,
        };
      });

      return res.status(200).json({
        message: "Get detail successfully",
        data: newResult[0],
      });
    } catch (error) {
      console.error("Error fetching sitter details:", error);
      return res.status(500).json({ message: "Request error occurred" });
    }
  }
);

sitterManagementRouter.put(
  "/:sitterId/booking/:bookingId",
  async (req, res) => {
    try {
      const sitterId = req.params.sitterId;
      const bookingId = req.params.bookingId;
      const statusBody = { ...req.body };

      const updateData = {
        statuses: statusBody.statuses,
      };

      if (updateData.statuses === "Success") {
        updateData.success_date_time = new Date().toISOString();
      }

      console.log("updateData:", updateData);

      const updateQuery = `
        UPDATE bookings
        SET statuses = $1, success_date_time = $2
        WHERE pet_sitter_id = $3 AND id = $4
      `;

      console.log("updateQuery:", updateQuery);

      const { rowCount } = await pool.query(updateQuery, [
        updateData.statuses,
        updateData.success_date_time || null,
        sitterId,
        bookingId,
      ]);

      console.log("rowCount:", rowCount);

      if (rowCount === 0) {
        return res.status(404).json({ message: "Booking not found" });
      }

      return res.status(200).json({
        message: "Booking has been updated successfully",
        data: {
          bookingId,
          updatedStatus: updateData.statuses,
          success_date_time: updateData.success_date_time || null,
        },
      });
    } catch (error) {
      console.error("Error updating booking:", error);
      return res.status(500).json({ message: "Request error occurred" });
    }
  }
);

sitterManagementRouter.post(
  "/:userId/booking/:bookingId/review",
  async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const newReview = {
        ...req.body,
        created_at: new Date(),
      };
      await pool.query(
        `insert into user_reviews (booking_id, rating, created_at)
        VALUES ($1, $2, $3)`,
        [bookingId, newReview.rating, newReview.created_at]
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

sitterManagementRouter.get("/:sitterId/payoutOption", async (req, res) => {
  try {
    const sitterId = req.params.sitterId;
    const page = parseInt(req.query.page) || 1;
    const dataPerPage = 10;

    const queryForTotalAmount = `SELECT SUM(amount) AS total_amount FROM payout_option WHERE pet_sitter_id = $1;`;
    const totalAmountQuery = await pool.query(queryForTotalAmount, [sitterId]);
    const totalAmount = parseFloat(
      totalAmountQuery.rows[0].total_amount || 0
    ).toFixed(2);

    const queryForPayout = `SELECT * FROM payout_option WHERE pet_sitter_id = $1;`;
    const sitterPayout = await pool.query(queryForPayout, [sitterId]);
    const totalData = sitterPayout.rows.length;
    const totalPages = Math.ceil(totalData / dataPerPage);
    const skip = (page - 1) * dataPerPage;
    const end = skip + dataPerPage;

    const paginatedBookingHistory = sitterPayout.rows.slice(skip, end);

    console.log("Database Query Result:", sitterPayout.rows);

    return res.status(200).json({
      message: "Get payout option successfully",
      totalAmount: totalAmount,
      data: paginatedBookingHistory,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        dataPerPage: dataPerPage,
        totalData: totalData,
      },
    });
  } catch (error) {
    console.error("Error fetching sitter details:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

sitterManagementRouter.get(
  "/:userId/booking/:bookingId/review",
  async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const result = await pool.query(
        `select * from bookings_user where booking_id = $1`,
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

sitterManagementRouter.get("/:sitterId/review", async (req, res) => {
  try {
    const sitterId = req.params.sitterId;

    const PAGE_SIZE = 5;
    const rate = req.query.rate || "";
    const page = req.query.page || 1;
    const limit = req.query.limit || PAGE_SIZE;
    const offset = (page - 1) * limit;

    let query = `SELECT *
    FROM sitter_reviews_view WHERE pet_sitter_id = $1`;
    let value = [sitterId];
    let condition = [];

    if (rate) {
      condition.push(`rating = $2 `);
      value.push(rate);
    }

    if (condition.length > 0) {
      query += ` and ` + condition;
    }
    const paginationResult = await pool.query(query, value);

    query += ` limit ${limit} offset ${offset}`;

    console.log(query);

    const result = await pool.query(query, value);

    const rows = result.rows;
    const total = parseInt(paginationResult.rows.length) || 0;
    const pagination = getPagingData(total, page, limit);

    return res.status(200).json({
      reviews: rows,
      message: "Get detail successfully",
      paging: pagination,
      totalData: total,
    });
  } catch (error) {
    console.error("Error fetching sitter details:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

export default sitterManagementRouter;
