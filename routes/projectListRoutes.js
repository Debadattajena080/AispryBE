import express from "express";
import { getProjectsByIndustry } from "../controller/projectController.js";

const router = express.Router();

// Route: Fetch projects by industry ID
router.get("/projects/:industryId", getProjectsByIndustry);

export default router;
