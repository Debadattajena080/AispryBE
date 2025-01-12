import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  industryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry', required: true },
  description: { type: String },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
