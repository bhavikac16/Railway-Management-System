const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { authenticateToken } = require("./middleware/authMiddleware");
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes");


require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());



app.use("/api/trains", trainRoutes);



app.use("/api/bookings", bookingRoutes);




app.use("/api/auth", authRoutes);


app.get("/api/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "Access granted!" });
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is running");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
