import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import joinRoutes from "./routes/joinRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gdgoc-website-six.vercel.app/"
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/join", joinRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/admin", adminRoutes);

export default app;
