import Event from "../models/Event.js";

/* ===========================
   GET ALL EVENTS (PUBLIC)
=========================== */
export const getEvents = async (req, res) => {
  try {
    const { status, category } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category && category !== "all") filter.category = category;

    const events = await Event.find(filter).sort({ date: 1 });

    res.json({ data: events });  // wrap response to match frontend expectation
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

/* ===========================
   GET SINGLE EVENT (PUBLIC)
=========================== */
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json({ data: event });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

/* ===========================
   CREATE EVENT (ADMIN)
=========================== */
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ data: event });
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
};

/* ===========================
   UPDATE EVENT (ADMIN)
=========================== */
export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Event not found" });

    res.json({ data: updated });
  } catch (error) {
    console.error("Update Event Error:", error);
    res.status(500).json({ message: "Failed to update event" });
  }
};

/* ===========================
   DELETE EVENT (ADMIN)
=========================== */
export const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });

    res.json({ data: deleted, message: "Event deleted" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};
