import ContactMessage from "../models/ContactMessage.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, category, message } = req.body;

    if (!name || !email || !subject || !category || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    await ContactMessage.create({
      name,
      email,
      subject,
      category,
      message
    });

    res.status(201).json({
      success: true,
      message: "Message received successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form"
    });
  }
};
