import express from "express";
import { submitJoinApplication } from "../controllers/joinController.js";

const router = express.Router();

router.post("/", submitJoinApplication);

export default router;
