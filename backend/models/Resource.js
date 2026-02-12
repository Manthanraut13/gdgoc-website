import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Documentation",
        "YouTube",
        "Course",
        "Tools",
        "Roadmap",
        "Blogs",
        "API",
        "GitHub Repo",
        "Other",
      ],
      default: "Other",
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    longDescription: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "📘",
    },
    image: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      default: "GDG",
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    language: {
      type: String,
      default: "English",
    },
    rating: {
      type: Number,
      default: 5,
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
