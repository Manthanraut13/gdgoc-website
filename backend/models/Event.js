import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  type: String,
  category: String,
  location: String,
  description: String,
  image: String,
  status: {
    type: String,
    enum: ["upcoming", "past"],
  },
  difficulty: String,
  tags: [String],
  seats: Number,
  registered: Number,
  attendees: Number,
  rating: Number,
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
