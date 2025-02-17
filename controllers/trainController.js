const { addTrain, getTrainsByRoute } = require("../models/trainModel");

const addNewTrain = async (req, res) => {
    try {
        const apiKey = req.header("x-api-key");
        if (apiKey !== process.env.ADMIN_API_KEY) {
            return res.status(403).json({ message: "Unauthorized Admin" });
        }

        const { train_name, source, destination, total_seats } = req.body;
        if (!train_name || !source || !destination || !total_seats) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await addTrain(train_name, source, destination, total_seats);
        res.json({ message: "Train added successfully" });

    } catch (error) {
        console.error("Train addition error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAvailableTrains = async (req, res) => {
    try {
        const { source, destination } = req.query;
        if (!source || !destination) {
            return res.status(400).json({ message: "Source and destination required" });
        }

        const trains = await getTrainsByRoute(source, destination);
        res.json(trains);

    } catch (error) {
        console.error("Error fetching trains:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addNewTrain, getAvailableTrains };
