import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "gdg@admin.com";
    const password = "admin123";

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit();
    }

    const hashed = await bcrypt.hash(password, 10);

    await Admin.create({ email, password: hashed });

    console.log("✨ Admin created successfully!");
    console.log("Login Email :", email);
    console.log("Password    :", password);

    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

run();
