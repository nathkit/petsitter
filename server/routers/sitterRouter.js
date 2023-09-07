import { Router } from "express";
import pool from "../utils/db.js";

const sitterRouter = Router();

sitterRouter.get("/", async (req, res) => {
  const search = req.query.search || "";
  let petType = req.query.petType || "";
  const rate = req.query.rate || "";
  const exp = req.query.exp || "";

  let query = `WITH pet_sitter_profile AS (
    SELECT 
        *,
        ((EXTRACT(YEAR FROM now()) - EXTRACT(YEAR FROM created_at)) * 12) + (EXTRACT(MONTH FROM now()) - EXTRACT(MONTH FROM created_at)) AS experience
    FROM pet_sitter_profile
)
SELECT *
FROM pet_sitter_profile`;
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
    petType = String(petType);
    petType = petType.split(`,`);
    if (petType.length > 0) {
      if (petType.length > 0) {
        const petTypeConditions = petType.map(
          (type) => `pet_sitter_pet_type LIKE '%${type}%'`
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
    query += ` where ` + condition.join(` and `);
  }

  query += ` limit 5`;

  console.log(query);
  console.log(value);

  const result = await pool.query(query, value);

  console.log(result.rows);

  const rows = result.rows;

  const parseTypeRows = rows.map((e) => {
    const types = e.pet_sitter_pet_type.replaceAll(" ", "").split(",");
    return {
      ...e,
      pet_sitter_pet_type: types,
    };
  });

  return res.json({
    data: parseTypeRows,
  });
});

export default sitterRouter;
