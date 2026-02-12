import React, { useState, useRef } from "react";
import { uploadImage } from "../../services/api";

const ImageUpload = ({ value, onChange, label = "Feature Image" }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Client-side validation
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("File is too large. Max size is 5MB.");
            return;
        }

        try {
            setUploading(true);
            setError("");
            const res = await uploadImage(file);
            const imageUrl = res.data.data;
            onChange(imageUrl);
        } catch (err) {
            console.error("Upload Error:", err);
            setError("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const clearImage = () => {
        onChange("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="space-y-4">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">
                {label}
            </label>

            <div className="relative group">
                {value ? (
                    <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-xl aspect-video bg-gray-50">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="bg-white text-gray-900 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-110 transition-transform"
                            >
                                Replace
                            </button>
                            <button
                                type="button"
                                onClick={clearImage}
                                className="bg-red-500 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-110 transition-transform"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="border-4 border-dashed border-gray-100 rounded-[2rem] aspect-video flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                    >
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            {uploading ? (
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : "🖼️"}
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-black text-gray-900 uppercase tracking-tight">
                                {uploading ? "Uploading..." : "Click to select image"}
                            </p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                PNG, JPG or WEBP (Max 5MB)
                            </p>
                        </div>
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
            </div>

            {error && (
                <p className="text-xs font-bold text-red-500 uppercase tracking-tight bg-red-50 p-3 rounded-xl border border-red-100">
                    ⚠️ {error}
                </p>
            )}
        </div>
    );
};

export default ImageUpload;
