const db = require("../config/db");

const bookSeat = async (user_id, train_id, seat_number) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Check seat availability
        const [seatCheck] = await connection.execute(
            "SELECT available_seats FROM trains WHERE id = ? FOR UPDATE",
            [train_id]
        );

        if (seatCheck.length === 0 || seatCheck[0].available_seats <= 0) {
            await connection.rollback();
            return { success: false, message: "No available seats" };
        }

        // Assign a seat number (first available seat)
        const assignedSeat = seatCheck[0].available_seats;

        // Insert booking record
        await connection.execute(
            "INSERT INTO bookings (user_id, train_id, seat_number) VALUES (?, ?, ?)",
            [user_id, train_id, assignedSeat]
        );

        // Update available seats in the train
        await connection.execute(
            "UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?",
            [train_id]
        );

        await connection.commit();
        return { success: true, seat_number: assignedSeat };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const getBookingsByUser = async (user_id) => {
    const [rows] = await db.execute(
        "SELECT b.id, t.train_name, b.seat_number, b.booking_time FROM bookings b JOIN trains t ON b.train_id = t.id WHERE b.user_id = ?",
        [user_id]
    );
    return rows;
};

module.exports = { bookSeat, getBookingsByUser };
