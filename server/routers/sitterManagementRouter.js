import { Router } from "express";
import pool from "../utils/db.js";

const sitterManagementRouter = Router();

sitterManagementRouter.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";
    let petType = req.query.petType || "";
    const rate = req.query.rate || "";
    const exp = req.query.exp || "";

    const requiredFields = [
      "pet_sitter_name",
      "pet_sitter_id",
      "pet_sitter_trade_name",
      "pet_sitter_district",
      "pet_sitter_province",
      "pet_sitter_pet_type",
      "pet_sitter_image",
      "pet_sitter_carousel",
      "experience",
      "pet_sitter_address",
      "pet_sitter_sub_district",
    ];

    const petSitterRequiedFields = requiredFields
      .map((e) => "p." + e)
      .join(", ");

    let query = `WITH pet_sitter_profile AS (
        SELECT
            *,
            ((EXTRACT(YEAR FROM now()) - EXTRACT(YEAR FROM created_at)) * 12) + (EXTRACT(MONTH FROM now()) - EXTRACT(MONTH FROM created_at)) AS experience
        FROM pet_sitter_profile
    )
  SELECT ${petSitterRequiedFields} , floor(AVG(r.rating_review_star)) as avg_rating
  FROM pet_sitter_profile as p JOIN rating_review as r ON p.pet_sitter_id = r.pet_sitter_id GROUP BY p.pet_sitter_id, ${petSitterRequiedFields}`;
    let value = [];
    let condition = [];

    if (search) {
      condition.push(
        `(Lower(pet_sitter_trade_name) like $` +
          (value.length + 1) +
          ` or Lower(pet_sitter_address) like $` +
          (value.length + 1) +
          ` or Lower(pet_sitter_district) like $` +
          (value.length + 1) +
          ` or Lower(pet_sitter_sub_district) like $` +
          (value.length + 1) +
          `  or Lower(pet_sitter_province) like $` +
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
            (type) => `'${type}' LIKE ANY (p.pet_sitter_pet_type)`
          );
          condition.push(`(` + petTypeConditions.join(` and `) + `)`);
        }
      }
    }

    if (rate) {
      condition.push(
        `floor(avg(r.rating_review_star)) = $` + (value.length + 1) + ``
      );
      value.push(rate);
    }

    if (exp) {
      if (exp == 0) {
        // 0-35 Month
        condition.push(`experience < 36`);
      } else if (exp == 1) {
        // 36-60 Month
        condition.push(`experience >= 36 and experience  <= 60`);
      } // >60 Month
      else condition.push(`experience > 60`);
    }

    if (condition.length > 0) {
      query += ` having ` + condition.join(` and `);
    }

    query += ` limit 5`;

    // console.log(query);

    const result = await pool.query(query, value);

    // const rows = result.rows;

    // const parseTypeRows = rows.map((e) => {
    //   const types = e.pet_sitter_pet_type.replaceAll(" ", "").split(",");
    //   return {
    //     ...e,
    //     pet_sitter_pet_type: types,
    //   };
    // });

    return res.json({
      message: "Get detail successfully",
      data: result,
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
    const query = `
      SELECT
      pet_sitter_profile.pet_sitter_id,
      pet_sitter_profile.pet_sitter_name,
      pet_sitter_profile.pet_sitter_image,
      pet_sitter_profile.pet_sitter_experience,
      pet_sitter_profile.introduction,
      pet_sitter_profile.services,
      pet_sitter_profile.my_place,
      pet_sitter_profile.pet_sitter_carousel,
      pet_sitter_profile.pet_sitter_trade_name,
      pet_sitter_profile.pet_sitter_province,
      pet_sitter_profile.pet_sitter_sub_district,
      pet_sitter_profile.pet_sitter_pet_type,
      rating_review.rating_review_star,
      rating_review.rating_review_text,
      rating_review.created_at,
      pet_owner_profile.pet_owner_image,
      pet_owner_profile.pet_owner_name
    FROM
      pet_sitter_profile
    JOIN
      rating_review
    ON
      pet_sitter_profile.pet_sitter_id = rating_review.pet_sitter_id
    JOIN
      pet_owner_profile
    ON
      rating_review.pet_owner_id = pet_owner_profile.pet_owner_id
  WHERE
      pet_sitter_profile.pet_sitter_id = $1;
      `;

    console.log("SQL Query:", query);
    console.log("Parameter (sitterId):", sitterId);

    const sitterData = await pool.query(query, [sitterId]);

    console.log("Database Query Result:", sitterData.rows);

    if (sitterData.rows.length === 0) {
      return res.status(404).json({ message: "Sitter not found" });
    }

    return res.status(200).json({
      data: sitterData.rows,
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
