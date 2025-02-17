const express = require("express");
const { addNewTrain, getAvailableTrains } = require("../controllers/trainController");
const router = express.Router();

router.post("/add", addNewTrain);  // Admin-only
router.get("/availability", getAvailableTrains);  // User-accessible

module.exports = router;
