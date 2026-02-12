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
    detailedDescription: {
      type: String,
      default: "",
    },
    longDescription: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ['planning', 'ongoing', 'completed', 'archived'],
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
      enum: ['web', 'mobile', 'ai-ml', 'iot', 'cloud', 'blockchain', 'cybersecurity'],
      default: 'web',
    },
    type: {
      type: String,
      default: "Open Source",
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    technologies: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
    toolsUsed: {
      type: [String],
      default: [],
    },
    timeline: {
      type: String,
      default: 'TBD',
    },
    milestones: [{
      title: String,
      date: String,
      status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
    }],
    impact: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    keyFeatures: {
      type: [String],
      default: [],
    },
    team: [{
      name: String,
      role: String,
      github: String,
      image: String
    }],
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
    demoVideo: {
      type: String,
      default: "",
    },
    documentation: {
      type: String,
      default: "",
    },
    resources: [{
      name: String,
      url: String
    }],
    link: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
