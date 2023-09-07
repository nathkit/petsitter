import { Router } from "express";
import pool from "../utils/db.js";

const sitterDetailRouter = Router();

sitterDetailRouter.get("/:sitterId", async (req, res) => {
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

export default sitterDetailRouter;
