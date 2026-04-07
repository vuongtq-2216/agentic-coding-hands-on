"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type UploadedImage = {
  id: string;
  previewUrl: string;
  uploadUrl?: string;
  status: "pending" | "uploading" | "uploaded" | "error";
};

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export function ImageUploader({
  images,
  onChange,
}: {
  images: UploadedImage[];
  onChange: (imgs: UploadedImage[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setError(null);

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Chỉ chấp nhận file ảnh (jpg, png, gif, webp)");
        continue;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError("Kích thước ảnh tối đa là 5MB");
        continue;
      }
      if (images.length >= MAX_IMAGES) break;

      const newImage: UploadedImage = {
        id: crypto.randomUUID(),
        previewUrl: URL.createObjectURL(file),
        status: "uploaded", // Simplified for MVP — skip actual upload
      };
      images = [...images, newImage];
    }
    onChange(images);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(id: string) {
    const img = images.find((i) => i.id === id);
    if (img) URL.revokeObjectURL(img.previewUrl);
    onChange(images.filter((i) => i.id !== id));
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {images.map((img) => (
        <div key={img.id} className="relative">
          <div className="w-[80px] h-[80px] rounded-[18px] border border-[#998C5F] overflow-hidden bg-white">
            <Image
              src={img.previewUrl}
              alt="Attached image"
              width={80}
              height={80}
              className="w-full h-full object-cover rounded border border-[#FFEA9E]"
            />
          </div>
          <button
            onClick={() => removeImage(img.id)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#D4271D] rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:bg-red-700 transition-colors"
            aria-label="Xóa ảnh"
          >
            ×
          </button>
        </div>
      ))}

      {images.length < MAX_IMAGES && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 h-12 border border-[#998C5F] rounded-lg px-2 py-1 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg text-[#999]">+</span>
          <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-bold text-[#999] leading-4 tracking-wide">
            Image
            <br />
            Tối đa 5
          </span>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="w-full text-sm text-[#D4271D] font-[family-name:var(--font-montserrat)] mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
