import Project from "../models/Project.Model.js";

// Controller: Get projects by industry ID
export const getProjectsByIndustry = async (req, res) => {
  const { industryId } = req.params;

  try {
    const projects = await Project.find({ industryId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects", details: error.message });
  }
};
