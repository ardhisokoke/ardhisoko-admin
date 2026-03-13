"use client";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  height?: string;
}

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "";

async function uploadToImgBB(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.data.url as string;
}

export function ImageUpload({ value, onChange, label = "Upload Photo", hint, height = "150px" }: ImageUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!IMGBB_API_KEY) {
      // Fallback: use FileReader for local preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onChange(dataUrl);
        toast.success(`${file.name} loaded`);
      };
      reader.readAsDataURL(file);
      return;
    }
    setUploading(true);
    toast.loading("Uploading…", { id: "upload" });
    try {
      const url = await uploadToImgBB(file);
      onChange(url);
      toast.success("Image uploaded!", { id: "upload" });
    } catch {
      toast.error("Upload failed. Paste URL instead.", { id: "upload" });
    } finally {
      setUploading(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="mb-3">
      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-md text-center cursor-pointer transition-all bg-white mb-2 overflow-hidden ${
          dragging ? "border-[#F5921E] bg-[#FFF9F4]" : "border-[#E0E0E0] hover:border-[#F5921E] hover:bg-[#FFF9F4]"
        }`}
        style={{
          minHeight: height,
          backgroundImage: value ? `url(${value})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        {value ? (
          <div className="absolute inset-0 flex items-end justify-center pb-3 bg-black/30">
            <span className="text-white font-montserrat text-[0.72rem] font-bold bg-black/50 px-3 py-1 rounded">
              {uploading ? "Uploading…" : "Click to change photo"}
            </span>
          </div>
        ) : (
          <div className="py-6 px-4">
            <div className="text-3xl mb-1">📷</div>
            <div className="font-montserrat text-[0.8rem] font-bold text-[#1A1A1A] mb-1">
              {label}
            </div>
            <div className="text-[0.7rem] text-[#666] mb-3">JPG, PNG, WEBP</div>
            <span className="inline-block bg-[#F5921E] text-white font-montserrat text-[0.68rem] font-bold px-3 py-1 rounded-sm uppercase tracking-wide">
              Browse Files
            </span>
          </div>
        )}
      </div>

      {/* URL input */}
      <div className="flex items-center gap-2 text-[0.72rem] text-[#666] my-2">
        <div className="flex-1 h-px bg-[#E0E0E0]" />
        <span>or paste URL</span>
        <div className="flex-1 h-px bg-[#E0E0E0]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="w-full px-3 py-2 border-[1.5px] border-[#E0E0E0] rounded font-opensans text-[0.83rem] outline-none focus:border-[#F5921E] transition-colors"
      />
      {hint && <p className="text-[0.68rem] text-[#666] mt-1">{hint}</p>}
    </div>
  );
}
