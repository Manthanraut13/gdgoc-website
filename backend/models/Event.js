import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  type: String, // e.g., "Workshop", "Conference", "Hackathon"
  category: String,
  location: String,
  description: String,
  detailedDescription: String,
  longDescription: String,
  images: [String],
  image: String, // Thumbnail/Main image
  status: {
    type: String,
    enum: ["upcoming", "past"],
    default: "upcoming"
  },
  difficulty: String,
  tags: [String],
  seats: Number,
  registered: { type: Number, default: 0 },
  attendees: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  registrationLink: String,
  prerequisites: [String],
  takeaways: [String],
  organizer: String,
  speaker: String,
  agenda: [String],
  feedback: [String],
  highlights: [String],
  conclusion: String,
  keySpeakers: [{
    name: String,
    role: String,
    description: String
  }],
  teams: [{
    name: String,
    lead: String,
    idea: String,
    theme: String,
    description: String
  }],
  themes: [String],
  recordNumber: String,
  requirements: [String],
  resources: [String]
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
