import { Router } from "express";
import pool from "../utils/db.js";

const sitterManagementRouter = Router();

sitterManagementRouter.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";
    let petType = req.query.petType || "";
    const rate = req.query.rate || "";
    const exp = req.query.exp || "";

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

    if (exp) {
      condition.push(`experience = ` + exp);
    }

    if (condition.length > 0) {
      query += ` where ` + condition.join(` and `);
    }

    query += ` limit 5`;

    // console.log(query);

    const result = await pool.query(query, value);

    const rows = result.rows;
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
    });
  } catch (error) {
    console.error("Error fetching sitter details:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

sitterManagementRouter.post("/", async (req, res) => { });

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

    console.log("Database Query Result:", sitterReview.rows);

    if (totalData === 0) {
      return res.status(404).json({ message: "Sitter not found" });
    }

    const paginatedReviews = sitterReview.rows.slice(skip, end);

    console.log("Database Query Result:", paginatedReviews);

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

sitterManagementRouter.put("/:sitterId", async (req, res) => { });

sitterManagementRouter.get("/:sitterId/booking/", async (req, res) => { });

sitterManagementRouter.get(
  "/:sitterId/booking/:bookingId",
  async (req, res) => {
    try {
      const bookingId = req.params.bookingId;

      let query = "select * from bookings_user where booking_id = $1";
      let value = [bookingId];

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

// Reject / Confirm /In Service
sitterManagementRouter.put(
  "/:sitterId/booking/:bookingId",
  async (req, res) => {
    try {
      const sitterId = req.params.sitterId;
      const bookingId = req.params.bookingId;
      const statusBody = { ...req.body };

      console.log("sitterId:", sitterId);
      console.log("bookingId:", bookingId);
      console.log("statusBody:", statusBody);

      const updateData = {
        statuses: statusBody.statuses,
      };

      console.log("updateData:", updateData);
      console.log("Hello");
      const updateQuery = `
        UPDATE bookings
        SET statuses = $1
        WHERE pet_sitter_id = $2 AND id = $3
      `;

      console.log("updateQuery:", updateQuery);

      const { rowCount } = await pool.query(updateQuery, [
        updateData.statuses,
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
        },
      });
    } catch (error) {
      console.error("Error updating booking:", error);
      return res.status(500).json({ message: "Request error occurred" });
    }
  }
);

// Success
sitterManagementRouter.put(
  "/:sitterId/booking/:bookingId/success",
  async (req, res) => {
    try {
      const sitterId = req.params.sitterId;
      const bookingId = req.params.bookingId;
      const statusBody = {
        ...req.body,
        success_date_time: new Date().toISOString(),
      };

      console.log("sitterId:", sitterId);
      console.log("bookingId:", bookingId);
      console.log("statusBody:", statusBody);

      const updateData = {
        statuses: statusBody.statuses,
        success_date_time: statusBody.success_date_time,
      };

      console.log("updateData:", updateData);
      console.log("Hello Success");

      const updateQuery = `
      UPDATE bookings
      SET statuses = $1, success_date_time = $2
      WHERE pet_sitter_id = $3 AND id = $4
    `;

      console.log("updateQuery:", updateQuery);

      const { rowCount } = await pool.query(updateQuery, [
        updateData.statuses,
        updateData.success_date_time,
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
          success_date_time: updateData.success_date_time,
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

sitterManagementRouter.get(
  "/:sitterId/payoutOption",
  async (req, res) => {
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
  }
);

export default sitterManagementRouter;
