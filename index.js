import "dotenv/config";
import express from "express";
import cors from "cors";
import DemoUser from "./models/DemoUser.Model.js";
import mongoDBConnection from "./db/connectDB.js";

const app = express();

// Connect to MongoDB
mongoDBConnection();

// Middleware
app.use(cors());
app.use(express.json());

// Route to save data
app.post("/saveUser", async (req, res) => {
  const { name, lastName, email, phone, subject } = req.body;

  // Check if all fields are provided
  if (!name || !email || !lastName || !phone || !subject) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Email validation (regex to check for a valid email format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Phone validation (must be 10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Phone number must be exactly 10 digits" });
  }

  // Name and Last Name validation (should not start with a number)
  const nameRegex = /^[^\d][a-zA-Z\s]*$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({ error: "Name cannot start with a number" });
  }

  if (!nameRegex.test(lastName)) {
    return res.status(400).json({ error: "Company name cannot start with a number" });
  }

  try {
    const newUser = new DemoUser({
      name,
      lastName,
      phone,
      email,
      subject,
    });

    await newUser.save();

    return res.status(201).json({ message: "User saved successfully for demo" });
  } catch (err) {
    return res.status(500).json({ error: "Error saving user", details: err.message });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("hello");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
