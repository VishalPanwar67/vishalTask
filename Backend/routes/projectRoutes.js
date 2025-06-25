import express from "express";
import {
  createProject,
  getProjects,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);
router.delete("/:id", deleteProject);
router.get("/", getProjects); // Public

export default router;
