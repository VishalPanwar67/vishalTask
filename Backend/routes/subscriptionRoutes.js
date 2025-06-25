import express from "express";
import {
  subscribe,
  getSubscriptions,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/", subscribe); // Public
router.get("/", getSubscriptions); // Admin only

export default router;
