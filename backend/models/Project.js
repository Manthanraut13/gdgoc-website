import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['planning', 'ongoing', 'completed'],
      default: 'planning',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      enum: ['web', 'mobile', 'ai-ml', 'iot', 'cloud'],
      default: 'web',
    },
    technologies: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
    timeline: {
      type: String,
      default: 'TBD',
    },
    impact: {
      type: String,
      default: '',
    },
    team: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      default: null,
    },
    demo: {
      type: String,
      default: null,
    },
    liveDemo: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
