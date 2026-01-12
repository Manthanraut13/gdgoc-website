import ContactMessage from "../models/ContactMessage.js";

/* ===========================
   PUBLIC: SUBMIT CONTACT FORM
=========================== */
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, category, message } = req.body;

    if (!name || !email || !subject || !category || !message) {
      return res.status(400).json({
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
      message: "Message received successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit contact form"
    });
  }
};

/* ===========================
   ADMIN: GET ALL CONTACTS
=========================== */
export const getContacts = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Fetch Contacts Error:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

/* ===========================
   ADMIN: DELETE CONTACT
=========================== */
export const deleteContact = async (req, res) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Message not found" });

    res.json({ message: "Message deleted" });
  } catch (error) {
    console.error("Delete Contact Error:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
};
