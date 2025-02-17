const express = require("express");
const { bookTrainSeat, getUserBookings } = require("../controllers/bookingController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/book", authenticateToken, bookTrainSeat);  // User can book a seat
router.get("/my-bookings", authenticateToken, getUserBookings);  // User can see their bookings

module.exports = router;
