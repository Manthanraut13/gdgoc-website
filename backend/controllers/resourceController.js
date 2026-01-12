import Resource from "../models/Resource.js";

// GET all resources
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json({ data: resources });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resources" });
  }
};

// CREATE resource
export const createResource = async (req, res) => {
  try {
    const newRes = await Resource.create(req.body);
    res.status(201).json({ data: newRes });
  } catch (error) {
    res.status(400).json({ message: "Failed to create resource" });
  }
};

// UPDATE resource
export const updateResource = async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ data: updated });
  } catch (error) {
    res.status(400).json({ message: "Failed to update resource" });
  }
};

// DELETE resource
export const deleteResource = async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);
    res.json({ data: deleted, message: "Resource deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete resource" });
  }
};
