import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getEvents);
router.get("/:id", getEventById);

// ADMIN PROTECTED
router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
