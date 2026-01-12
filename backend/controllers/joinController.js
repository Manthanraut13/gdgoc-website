import JoinApplication from "../models/JoinApplication.js";

/* ===========================
   PUBLIC: SUBMIT JOIN FORM
=========================== */
export const submitJoinApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      year,
      major,
      interests,
      experience,
      message
    } = req.body;

    if (
      !name ||
      !email ||
      !year ||
      !major ||
      !interests?.length ||
      !experience
    ) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

    await JoinApplication.create({
      name,
      email,
      year,
      major,
      interests,
      experience,
      message
    });

    res.status(201).json({
      message: "Application submitted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit application"
    });
  }
};

/* ===========================
   ADMIN: GET ALL JOIN REQUESTS
=========================== */
export const getJoinApplications = async (req, res) => {
  try {
    const apps = await JoinApplication.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    console.error("Fetch Join Error:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

/* ===========================
   ADMIN: DELETE JOIN REQUEST
=========================== */
export const deleteJoin = async (req, res) => {
  try {
    const deleted = await JoinApplication.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Application not found" });

    res.json({ message: "Application deleted" });
  } catch (error) {
    console.error("Delete Join Error:", error);
    res.status(500).json({ message: "Failed to delete application" });
  }
};
