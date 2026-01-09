import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Backend running on http://localhost:${PORT}`)
    );
    app.get("/", (req, res) => {
  res.send("GDG Backend is running 🚀");
  app.use("/api/events", eventRoutes);
app.use("/api/blogs", blogRoutes);

});

  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
