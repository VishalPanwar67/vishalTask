import express from "express";
import {
  createClient,
  getClients,
  deleteClient,
} from "../controllers/clientController.js";

const router = express.Router();

router.post("/", createClient); // Admin only
router.delete("/:id", deleteClient); // Admin only
router.get("/", getClients); // Public

export default router;
