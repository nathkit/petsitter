// โค้ดนี้อยู่ในไฟล์ server/utils/db.js
import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString:
    "postgresql://postgres:vN4Qg4n-ypk@pLS@db.wjxguyrdfqbtwsetylfq.supabase.co:5432/postgres",
});

export default pool;
