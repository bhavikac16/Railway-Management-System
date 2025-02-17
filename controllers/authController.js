const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../models/userModel");

const register = async (req, res) => {
    try {
      console.log("Incoming request body:", req.body);
  
      const { name, email, password, role } = req.body;
  
      if (!name || !email || !password || !role) {
        console.log("Missing required fields");
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (typeof password !== "string") {
        console.log("Password is not a string!");
        return res.status(400).json({ message: "Invalid password format" });
      }
  
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        console.log("User already exists");
        return res.status(400).json({ message: "User already exists" });
      }
  
      console.log("Hashing password:", password);
  
      
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      console.log("Hashed password:", hashedPassword);
  
      await createUser(name, email, hashedPassword, role);
  
      console.log("User created successfully!");
      res.json({ message: "User registered successfully" });
  
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
  
  

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
