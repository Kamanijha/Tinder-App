
// components/ImageUploader.jsx
import { useState } from "react";

const ImageUploader = ({ onImageSelect, existingImage }) => {
    const [photoUrl, setPhotoUrl] = useState("");
    const [localImage, setLocalImage] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLocalImage(reader.result);
                setPhotoUrl("");
                onImageSelect(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlChange = (e) => {
        setPhotoUrl(e.target.value);
        setLocalImage("");
        onImageSelect(e.target.value);
    };

    const previewImage = localImage || photoUrl || existingImage;

    return (
        <div className="p-3">
            {/* URL Input */}
            <input
                type="text"
                value={photoUrl}
                onChange={handleUrlChange}
                placeholder="Enter Image URL"
                className="input input-bordered w-full mb-3"
            />

            <p className="text-center mb-2">OR</p>

            {/* Local File Upload */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="input input-bordered w-full mb-3"
            />

            {/* Image Preview */}
            {previewImage && (
                <div className="mb-4">
                    <p className="font-semibold mb-1">Image Preview:</p>
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
