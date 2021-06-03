import express from "express";
import { post, remove, allbookings, bookingbyid, search } from "../controller/hotel.js";
const router = express.Router();

// booking search

router.get("/bookings/search", search)
// create booking
router.post("/bookings", post);

// update booking
// router.put("/bookings/:id", put);

// delete booking
router.delete("/bookings/:id", remove);

//  get booking by id
router.get("/bookings/:id", bookingbyid);

// view all bookings
router.get("/bookings", allbookings);





export default router;

