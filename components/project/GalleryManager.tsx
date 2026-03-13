"use client";
import { GallerySlot } from "@/types";
import toast from "react-hot-toast";

interface GalleryManagerProps {
  slots: GallerySlot[];
  onChange: (slots: GallerySlot[]) => void;
  projectName: string;
}

export function GalleryManager({ slots, onChange, projectName }: GalleryManagerProps) {
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "";

  async function handleFileUpload(file: File, idx: number) {
    if (!IMGBB_API_KEY) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const next = [...slots];
        next[idx] = { url };
        onChange(next);
        toast.success(`Photo ${idx + 1} loaded`);
      };
      reader.readAsDataURL(file);
      return;
    }
    toast.loading(`Uploading photo ${idx + 1}…`, { id: `gup${idx}` });
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: "POST", body: fd });
      const data = await res.json();
      const url = data.data.url as string;
      const next = [...slots];
      next[idx] = { url };
      onChange(next);
      toast.success(`Photo ${idx + 1} uploaded`, { id: `gup${idx}` });
    } catch {
      toast.error("Upload failed", { id: `gup${idx}` });
    }
  }

  function clearSlot(idx: number) {
    const next = [...slots];
    next[idx] = { url: "" };
    onChange(next);
  }

  function updateUrl(idx: number, url: string) {
    const next = [...slots];
    next[idx] = { url };
    onChange(next);
  }

  return (
    <div>
      {/* Grid preview */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        {slots.map((slot, idx) => (
          <div
            key={idx}
            className="gallery-slot relative h-[90px] border-[1.5px] border-dashed border-[#E0E0E0] rounded-md overflow-hidden cursor-pointer hover:border-[#F5921E] transition-colors bg-[#F5F5F5]"
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(f, idx);
              }}
            />
            {/* Number badge */}
            <span className="absolute top-1 left-1.5 bg-black/55 text-white font-montserrat text-[0.58rem] font-extrabold px-1.5 py-0.5 rounded-sm z-20">
              {idx + 1}
            </span>
            {slot.url ? (
              <>
                <img src={slot.url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={(e) => { e.stopPropagation(); clearSlot(idx); }}
                  className="slot-delete absolute top-1 right-1 bg-[#E53935] text-white border-none w-5 h-5 rounded-sm text-[0.6rem] hidden items-center justify-center z-30"
                  style={{ display: "none" }}
                >
                  ✕
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); clearSlot(idx); }}
                  className="absolute top-1 right-1 bg-[#E53935] text-white border-none w-5 h-5 rounded-sm text-[0.6rem] items-center justify-center z-30 opacity-0 group-hover:opacity-100 flex"
                >
                  ✕
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-[#666]">
                <span className="text-xl">+</span>
                <span className="font-montserrat text-[0.6rem] font-bold">Photo {idx + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-[0.72rem] text-[#666] mb-3">
        ℹ️ Click any slot to upload, or paste URLs below.
      </p>

      {/* URL inputs */}
      <div className="grid grid-cols-2 gap-3">
        {slots.map((slot, idx) => (
          <div key={idx} className="mb-2">
            <label className="block font-montserrat text-[0.6rem] font-bold tracking-widest uppercase text-[#666] mb-1">
              Photo {idx + 1} URL
            </label>
            <input
              type="text"
              value={slot.url}
              onChange={(e) => updateUrl(idx, e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 border-[1.5px] border-[#E0E0E0] rounded font-opensans text-[0.83rem] outline-none focus:border-[#F5921E] transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
