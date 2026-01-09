import mongoose from "mongoose";
import dotenv from "dotenv";

import Event from "../models/Event.js";
import Blog from "../models/Blog.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Event.deleteMany();
    await Blog.deleteMany();

    await Event.insertMany([
      {
        title: "Android Study Jam",
        date: new Date("2024-01-15"),
        time: "2:00 PM - 5:00 PM",
        type: "Workshop",
        category: "mobile",
        location: "Tech Building",
        description: "Learn Android with Kotlin",
        image: "",
        status: "upcoming",
        difficulty: "Beginner",
        tags: ["Android", "Kotlin"],
        seats: 50,
        registered: 30
      }
    ]);

    await Blog.insertMany([
      {
        title: "Getting Started with Flutter",
        excerpt: "Learn Flutter basics",
        content: "Full blog content here",
        author: "GDG Team",
        authorRole: "Admin",
        date: new Date(),
        category: "Tech Articles",
        readTime: "8 min read",
        image: "",
        featured: true,
        tags: ["Flutter"],
        likes: 10,
        comments: 2
      }
    ]);

    console.log("✅ Sample data seeded");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
};

seedData();
