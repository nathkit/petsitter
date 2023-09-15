import { Router } from "express";
import pool from "../utils/db.js";
import authorizeUser from "../middleWares/bookingMiddleware.js";

const bookingRouter = Router();

bookingRouter.post("/:userId/:sitterId", async (req, res) => {
    const userId = req.params.userId
    const sitterId = req.params.sitterId
    const petId = req.body.pet_id
    const status = "Waiting for confirm"
    const newBooking = {
        ...req.body,
        status: status,
        created_at: new Date()
    }

    const insertBooking = `insert into bookings (user_id, pet_sitter_id, start_date_time, end_date_time, amount, message, payment_method, statuses, created_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id`

    const insertBookingPets = `insert into booking_pets (booking_id, pet_id) values ($1, $2)`


    try {
        await pool.query('begin')
        const insertBookingResult = await pool.query(insertBooking
            ,
            [
                userId,
                sitterId,
                newBooking.start_date_time,
                newBooking.end_date_time,
                newBooking.amount,
                newBooking.message,
                newBooking.payment_method,
                newBooking.status,
                newBooking.created_at,
            ]
        );
        console.log(insertBookingResult)

        const bookingId = insertBookingResult.rows[0].id
        // console.log(bookingId)
        // console.log(petId)
        for (let i in petId) {
            await pool.query(insertBookingPets, [bookingId, petId[i]])
            // console.log(bookingId)
        }

        await pool.query('commit')

    } catch (error) {

        await pool.query('rollback')
        console.error('Error inserting data:', error)
        return res.status(500).json({
            error: 'An error occurred while inserting data'
        })
    }

    return res.status(201).json({
        "message": "Your booking has been created successfully"
    })
});

export default bookingRouter;
