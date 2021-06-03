import express from "express";
import { post, remove, listname, list, search } from "../controller/mailinglist.js";
const router = express.Router();

// create booking
router.post("/bookings", post);

// update booking
// router.put("/bookings/:id", put);

// delete booking
router.delete("/bookings/:id", remove);

//  get booking by id
router.get("/bookings/:id", listname);

// view all bookings
router.get("/bookings", list);

// booking search

router.get("/bookings/search",search)




export default router;

