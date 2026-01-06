import mongoose from "mongoose";

const joinApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  year: { type: String, required: true },
  major: { type: String, required: true },
  interests: { type: [String], required: true },
  experience: { type: String, required: true },
  message: String
}, { timestamps: true });

export default mongoose.model("JoinApplication", joinApplicationSchema);
