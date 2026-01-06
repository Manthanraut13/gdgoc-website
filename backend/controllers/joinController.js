import JoinApplication from "../models/JoinApplication.js";

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
      !name || !email || !year || !major ||
      !interests?.length || !experience
    ) {
      return res.status(400).json({
        success: false,
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
      success: true,
      message: "Application submitted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit application"
    });
  }
};
