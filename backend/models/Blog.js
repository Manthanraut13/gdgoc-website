import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: { type: String, required: true },
  author: String,
  authorRole: String,
  authorAvatar: String,
  date: { type: Date, default: Date.now },
  category: String,
  readTime: { type: String, default: "5 min read" },
  image: String,
  featured: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  tags: { type: [String], default: [] },
  seoKeywords: { type: [String], default: [] },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
