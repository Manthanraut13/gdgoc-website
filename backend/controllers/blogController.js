import Blog from "../models/Blog.js";

/* ===========================
   GET ALL BLOGS (PUBLIC)
=========================== */
export const getBlogs = async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(filter).sort({ date: -1 });

    res.json({ data: blogs });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

/* ===========================
   GET BLOG BY ID (PUBLIC)
=========================== */
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    res.json({ data: blog });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

/* ===========================
   CREATE BLOG (ADMIN)
=========================== */
export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ data: blog });
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

/* ===========================
   UPDATE BLOG (ADMIN)
=========================== */
export const updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Blog not found" });

    res.json({ data: updated });
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ message: "Failed to update blog" });
  }
};

/* ===========================
   DELETE BLOG (ADMIN)
=========================== */
export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Blog not found" });

    res.json({ data: deleted, message: "Blog deleted" });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};
