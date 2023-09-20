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

    return res.json({
      message: "Get detail successfully",
      data: parseTypeRows,
    });
  } catch (error) {
    console.error("Error fetching sitter details:", error);
    return res.status(500).json({ message: "Request error occurred" });
  }
});

sitterManagementRouter.post("/", async (req, res) => {});

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

sitterManagementRouter.put("/:sitterId", async (req, res) => {});

sitterManagementRouter.get(
  "/sitterManagement/:sitterId/booking/",
  async (req, res) => {}
);

sitterManagementRouter.get(
  "/sitterManagement/:sitterId/booking/:bookingId",
  async (req, res) => {}
);

// Reject / Confirm /In Service
sitterManagementRouter.put(
  "/sitterManagement/:sitterId/booking/:bookingId",
  async (req, res) => {}
);

// Success
sitterManagementRouter.put(
  "/sitterManagement/:sitterId/booking/:bookingId",
  async (req, res) => {}
);

sitterManagementRouter.put(
  "/sitterManagement/:userId/booking/:bookingId/review",
  async (req, res) => {}
);

export default sitterManagementRouter;
