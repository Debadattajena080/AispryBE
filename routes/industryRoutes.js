import express from "express";
import { getIndustries } from "../controller/industryController.js"

const router = express.Router();

// Route to get all industries
router.get("/industries", getIndustries);

export default router;
