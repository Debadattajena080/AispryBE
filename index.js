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

  if (!name || !email || !lastName || !phone || !subject) {
    return res.status(400).json({ error: "All fields are required" });
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

    return res
      .status(201)
      .json({ message: "User saved successfully for Demo" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error saving user", details: err.message });
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
