import Project from "../models/Project.js";
import { v2 as cloudinary } from "cloudinary";

// Create a new project
export const createProject = async (req, res) => {
  async function uploading(file, folder) {
    const options = {
      folder,
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  }

  const { name, description } = req.body;
  const image = req.files?.image;

  try {
    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    let imageUrl = "";
    let cloudinary_name = "";

    if (image) {
      const uploadedResponse = await uploading(image, "Projects");
      imageUrl = uploadedResponse.secure_url;
      cloudinary_name = uploadedResponse.public_id;
    }

    const project = new Project({
      name,
      description,
      imageUrl,
      cloudinary_name,
    });

    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (err) {
    console.error("Error creating project: ", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // If the project has an image, delete it from Cloudinary
    if (project.cloudinary_name) {
      const cloudinaryResponse = await cloudinary.uploader.destroy(project.cloudinary_name);
      if (cloudinaryResponse.result !== "ok") {
        return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
      }
    }

    // Delete the project from the database
    await project.deleteOne(); // `deleteOne` is more explicit for single document deletion
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project: ", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects: ", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
