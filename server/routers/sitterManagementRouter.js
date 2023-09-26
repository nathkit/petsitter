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
    const exp = req.query.exp || "";
    const page = req.query.page || 1;
    const limit = req.query.limit || PAGE_SIZE;
    const offset = (page - 1) * limit;

    let query = `SELECT * FROM pet_sitter_view`;
    let paginationQuery = `SELECT COUNT(id) FROM pet_sitter_view`;
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

    if (exp) {
      condition.push(`experience = ` + exp);
    }

    if (condition.length > 0) {
      query += ` where ` + condition.join(` and `);
      paginationQuery += ` where ` + condition.join(` and `);
    }

    query += ` limit ${limit} offset ${offset}`;

    console.log(query);
    console.log(paginationQuery);

    const result = await pool.query(query, value);
    const paginationResult = await pool.query(paginationQuery, value);

    const rows = result.rows;
    const total = paginationResult.rows[0].count;
    const pagination = getPagingData(total, page, limit);
    // console.log(rows);

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

  const userQuery = `UPDATE users set full_name = $1, phone = $2, email = $3, updated_at = $4, sitter_authen = $5
  ${
    req.files
      ? ", image_name = $7, profile_image_path = $8 where id = $6"
      : "where id = $6"
  }`;
  const userValues = Object.values(user);
  // console.log(userValues);
  // upload avatar ************************************************************

  if (req.files) {
    // console.log("in");
    // console.log(req.files.avatarFile[0]);
    const { avatarName, url } = await supabaseUpload(
      req.files.avatarFile[0],
      req.body.avatarName
    );
    userValues.push(avatarName, url);
  }
  // console.log("2");
  // console.log(userQuery);
  // console.log(userValues);
  const updateUserResult = await pool.query(userQuery, userValues);

  //--------------------------------------------------------------------------
  // create pet_sitter ***********************************************************

  const sitterQuery = `insert into pet_sitter(experience,introduction,trade_name,service_description,place_description,address_detail,district,province,sub_district,post_code,user_id,created_at,updated_at)
                     values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`;

  const sitterValues = Object.values(req.body);
  sitterValues.splice(0, 4);
  sitterValues.splice(11);
  sitterValues.push(new Date(), new Date());
  // console.log(sitterValues);
  const createSitterResult = await pool.query(sitterQuery, sitterValues);
  const sitterResPondes = await pool.query(
    `select id from pet_sitter where user_id = $1`,
    [req.body.userId]
  );

  // //----------------------------------------------------------------------------
  // // create pet type ************************************************************

  const petSitterId = sitterResPondes.rows[0].id;
  const petType = req.body.petType;
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
    `select * from users inner join pet_sitter on users.id = pet_sitter.user_id where pet_sitter.id = $1`,
    [petSitterId]
  );
  result = serverRespondes.rows[0];
  return res.json({
    message: "Sitter Profile has been created successfully",
    userData: {
      id: result.user_id,
      fullName: result.full_name,
      email: result.email,
      idNumber: result.id_number,
      phone: result.phone,
      dateOfbirth: result.date_of_birth,
      image_name: result.image_name,
      image_path: result.profile_image_path,
      sitterAuthen: result.sitter_authen,
    },
    sitterData: {
      id: result.id,
      petType: petType,
      experience: result.experience,
      intro: result.introduction,
      tradeName: result.trade_name,
      service: result.service_description,
      myPlace: result.place_description,
      address: result.address_detail,
      subDistrict: result.sub_district,
      district: result.district,
      province: result.province,
      postCode: result.post_code,
    },
  });
});

sitterManagementRouter.get("/:sitterId", async (req, res) => {
  try {
    const sitterId = req.params.sitterId;
    const page = parseInt(req.query.page) || 1;
    const reviewPerPage = 5;

    const queryForDetail = `SELECT * FROM pet_sitter_view WHERE id = $1;`;

    // Use "sitter_reviews_view" instead of "sitter_reviews_by_id" for reviews
    const queryForReviews = `SELECT *
    FROM sitter_reviews_view WHERE pet_sitter_id = $1;`;

    const sitterDetails = await pool.query(queryForDetail, [sitterId]);
    const sitterReview = await pool.query(queryForReviews, [sitterId]);
    const totalData = sitterReview.rows.length;
    const totalPages = Math.ceil(totalData / reviewPerPage);
    const skip = (page - 1) * reviewPerPage;
    const end = skip + reviewPerPage;

    // console.log("Database Query Result:", sitterReview.rows);

    if (totalData === 0) {
      return res.status(404).json({ message: "Sitter not found" });
    }

    const paginatedReviews = sitterReview.rows.slice(skip, end);

    // console.log("Database Query Result:", paginatedReviews);

    return res.status(200).json({
      data: sitterDetails.rows,
      reviews: paginatedReviews,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        dataPerPage: reviewPerPage,
        totalData: totalData,
      },
    });
  } catch (error) {
    console.error("Error fetching sitter details:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

sitterManagementRouter.put("/:sitterId", async (req, res) => {});

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

  let query = `
    SELECT distinct booking_no, user_full_name, pet_ids, duration, start_date_time, end_date_time, statuses
    FROM bookings_history_detail 
    WHERE id = $1
  `;
  let values = [sitterId];

  if (searchKeywords) {
    query += `
      AND (user_full_name ILIKE $${values.length + 1}
      OR start_date_time::text ILIKE $${values.length + 1}
      OR end_date_time::text ILIKE $${values.length + 1})
    `;
    values.push(`%${searchKeywords}%`);
  }

  if (status.length) {
    query += `
      AND statuses IN (${status
        .map((_, index) => `$${values.length + index + 1}`)
        .join(",")})
    `;
    values.push(...status);
  }

  query += `
    ORDER BY booking_no DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;
  values.push(pageSize, offset);

  // console.log(query);
  try {
    // console.log(query);
    const results = await pool.query(query, values);
    const totalCountRes = await pool.query(
      `SELECT COUNT(*) FROM bookings_history_detail WHERE id = $1`,
      [sitterId]
    );
    const totalCount = parseInt(totalCountRes.rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / pageSize);
    // console.log("TotalRows:", results.rows.length);
    // console.log("TotalRows:", results.rows);
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
  "/:sitterId/booking/:bookingId",
  async (req, res) => {}
);

sitterManagementRouter.put(
  "/:sitterId/booking/:bookingId",
  async (req, res) => {
    try {
      const sitterId = req.params.sitterId;
      const bookingId = req.params.bookingId;
      const statusBody = { ...req.body };

      // console.log("sitterId:", sitterId);
      // console.log("bookingId:", bookingId);
      // console.log("statusBody:", statusBody);

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

sitterManagementRouter.put(
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

    const queryForPayout = `SELECT * FROM payout_option WHERE pet_sitter_id = $1;`;
    const sitterPayout = await pool.query(queryForPayout, [sitterId]);
    console.log("Database Query Result:", sitterPayout.rows);

    return res.status(200).json({
      message: "Get payout option successfully",
      data: sitterPayout.rows,
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

export default sitterManagementRouter;
