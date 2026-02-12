import Project from "../models/Project.js";

// GET all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ data: projects });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// CREATE a new project
export const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({ data: newProject });
  } catch (error) {
    console.error("❌ Project Create Error:", error);
    res.status(400).json({
      message: "Failed to create project",
      error: error.message,
      details: error.errors
    });
  }
};

// UPDATE project
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ data: updated });
  } catch (error) {
    console.error("❌ Project Update Error:", error);
    res.status(400).json({
      message: "Failed to update project",
      error: error.message,
      details: error.errors
    });
  }
};

// DELETE project
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    res.json({ data: deleted, message: "Project deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete project" });
  }
};
