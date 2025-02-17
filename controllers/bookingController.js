const { bookSeat, getBookingsByUser } = require("../models/bookingModel");

const bookTrainSeat = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { train_id } = req.body;

        if (!train_id) {
            return res.status(400).json({ message: "Train ID is required" });
        }

        const bookingResult = await bookSeat(user_id, train_id);

        if (!bookingResult.success) {
            return res.status(400).json({ message: bookingResult.message });
        }

        res.json({ message: "Seat booked successfully", seat_number: bookingResult.seat_number });

    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const bookings = await getBookingsByUser(user_id);
        res.json(bookings);
    } catch (error) {
        console.error("Fetch booking error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { bookTrainSeat, getUserBookings };
