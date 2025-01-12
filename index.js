import "dotenv/config";
import express from "express";
import cors from "cors";
import DemoUser from "./models/DemoUser.Model.js";
import mongoDBConnection from "./db/connectDB.js";
// import Industry from "./models/Industry.Model.js";

import industryRoutes from "./routes/industryRoutes.js"
import projectListRoutes from "./routes/projectListRoutes.js"

const app = express();

mongoDBConnection();

app.use(cors());
app.use(express.json());

app.post("/saveUser", async (req, res) => {
  const { name, lastName, email, phone, subject } = req.body;

  if (!name || !email || !lastName || !phone || !subject) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res
      .status(400)
      .json({ error: "Phone number must be exactly 10 digits" });
  }

  const nameRegex = /^[^\d][a-zA-Z\s]*$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({ error: "Name cannot start with a number" });
  }

  if (!nameRegex.test(lastName)) {
    return res
      .status(400)
      .json({ error: "Company name cannot start with a number" });
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
      .json({ message: "User saved successfully for demo" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error saving user", details: err.message });
  }
});
// app.get("/industries", async (req, res) => {
//   try {
//     const industries = await Industry.find({}, { _id: 0, industryName: 1 });
//     console.log(industries);
//     res.json(industries);
//   } catch (err) {
//     console.error("Error fetching industries:", err);
//     res.status(500).send("Error fetching industries");
//   }
// });

app.use("/api", industryRoutes);
app.use("/api", projectListRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("hello");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
