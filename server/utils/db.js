// โค้ดนี้อยู่ในไฟล์ server/utils/db.js
import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString:
  `postgresql://postgres.wjxguyrdfqbtwsetylfq:${process.env.DB_PASSWAORD}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`,
});

export default pool;
