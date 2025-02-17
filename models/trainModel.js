const db = require("../config/db");

const addTrain = async (train_name, source, destination, total_seats) => {
    const [result] = await db.execute(
        "INSERT INTO trains (train_name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)",
        [train_name, source, destination, total_seats, total_seats]
    );
    return result;
};

const getTrainsByRoute = async (source, destination) => {
    const [rows] = await db.execute(
        "SELECT * FROM trains WHERE source = ? AND destination = ?",
        [source, destination]
    );
    return rows;
};

module.exports = { addTrain, getTrainsByRoute };
