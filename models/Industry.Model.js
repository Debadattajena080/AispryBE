import mongoose from "mongoose";

const industrySchema = new mongoose.Schema({
  industryName: { type: String, required: true },
});

const Industry = mongoose.model("Industry", industrySchema);

export default Industry;
