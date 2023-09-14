import { Router } from "express";
import pool from "../utils/db.js";

const bookingRouter = Router();

bookingRouter.post("/:userId/:sitterId", async (req, res) => {});

export default bookingRouter;
