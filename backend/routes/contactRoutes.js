import express from "express";
import {
  submitContactForm,
  getContacts,
  deleteContact
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC - contact form
router.post("/", submitContactForm);

// ADMIN - list + delete
router.get("/", protect, getContacts);
router.delete("/:id", protect, deleteContact);

export default router;
