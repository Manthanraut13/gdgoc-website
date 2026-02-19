import React, { useState, useRef } from "react";
import { uploadImage } from "../../services/api";

const MultiImageUpload = ({ value = [], onChange, label = "Gallery Assets" }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        setError("");

        try {
            const uploadPromises = files.map(async (file) => {
                if (!file.type.startsWith("image/")) {
                    throw new Error(`File ${file.name} is not an image.`);
                }
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error(`File ${file.name} is too large (>5MB).`);
                }
                const res = await uploadImage(file);
                return res.data.data; // The unique URL from MongoDB
            });

            const newUrls = await Promise.all(uploadPromises);
            onChange([...value, ...newUrls]);
        } catch (err) {
            console.error("Multi-Upload Error:", err);
            setError(err.message || "Failed to upload some images.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const removeImage = (indexToRemove) => {
        const filtered = value.filter((_, index) => index !== indexToRemove);
        onChange(filtered);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">
                    {label}
                </label>
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    disabled={uploading}
                    className="bg-gray-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all disabled:opacity-50"
                >
                    {uploading ? "Uploading..." : "+ Upload Assets"}
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {value.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 group">
                        <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}

                {uploading && (
                    <div className="aspect-square rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/30 flex items-center justify-center">
                        <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {value.length === 0 && !uploading && (
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="col-span-full border-2 border-dashed border-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-2xl">📸</span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No assets uploaded yet</p>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
            />

            {error && (
                <p className="text-xs font-bold text-red-500 uppercase tracking-tight bg-red-50 p-3 rounded-xl border border-red-100">
                    ⚠️ {error}
                </p>
            )}
        </div>
    );
};

export default MultiImageUpload;
