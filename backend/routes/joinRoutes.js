import express from "express";
import {
  submitJoinApplication,
  getJoinApplications,
  deleteJoin
} from "../controllers/joinController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC - submit application
router.post("/", submitJoinApplication);

// ADMIN - list + delete
router.get("/", protect, getJoinApplications);
router.delete("/:id", protect, deleteJoin);

export default router;
