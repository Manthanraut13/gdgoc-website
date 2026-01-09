import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  author: String,
  authorRole: String,
  date: Date,
  category: String,
  readTime: String,
  image: String,
  featured: Boolean,
  tags: [String],
  likes: Number,
  comments: Number,
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
