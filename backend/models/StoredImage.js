import mongoose from "mongoose";

const storedImageSchema = new mongoose.Schema({
    name: String,
    contentType: String,
    data: Buffer
}, { timestamps: true });

export default mongoose.model("StoredImage", storedImageSchema);
