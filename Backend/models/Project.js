import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"]
  },
  description: {
    type: String,
    required: [true, "Project description is required"]
  },
  imageUrl: {
    type: String
  },
  cloudinary_name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
      timestamps: true,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
