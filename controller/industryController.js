import Industry from "../models/Industry.Model.js";

export const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find({}, { _id: 1, industryName: 1 });
    res.json(industries);
  } catch (err) {
    console.error("Error fetching industries:", err);
    res.status(500).send("Error fetching industries");
  }
};
