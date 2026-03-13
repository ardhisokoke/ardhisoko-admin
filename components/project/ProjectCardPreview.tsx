"use client";
import { Project } from "@/types";

interface ProjectCardPreviewProps {
  project: Project;
}

export function ProjectCardPreview({ project }: ProjectCardPreviewProps) {
  const isApt = project.type === "apt";
  const tagLabel = isApt ? "Apartments" : "Land for Sale";
  const tagColor = isApt ? "#1A1A1A" : "#2E7D1F";

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] max-w-[360px] mx-auto">
      {/* Image */}
      <div className="h-[210px] relative overflow-hidden">
        <img
          src={project.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80"}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {/* Price */}
        <div className="absolute bottom-3 left-3 text-white font-montserrat">
          <div className="text-[1.15rem] font-black leading-none">{project.price}</div>
          <div className="text-[0.63rem] font-medium opacity-80 mt-0.5">{project.priceSubtitle}</div>
        </div>
        {/* Type tag */}
        <span
          className="absolute top-3 left-3 text-white font-montserrat text-[0.6rem] font-extrabold px-2 py-1 rounded-sm uppercase tracking-wide"
          style={{ background: tagColor }}
        >
          {tagLabel}
        </span>
        {/* Status badge */}
        <span className="absolute top-3 right-3 bg-[#F5921E] text-white font-montserrat text-[0.58rem] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
          {project.statusBadge}
        </span>
      </div>
      {/* Body */}
      <div className="p-4">
        <div className="text-[0.66rem] text-[#F5921E] font-montserrat font-bold tracking-widest uppercase mb-1">
          📍 {project.location}
        </div>
        <div className="font-montserrat text-[0.92rem] font-extrabold text-[#1A1A1A] mb-3 leading-snug">
          {project.name}
        </div>
        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-1">
          <button className="py-2 px-1 bg-[#25D366] text-white font-montserrat text-[0.63rem] font-bold rounded flex items-center justify-center gap-1">
            💬 WhatsApp
          </button>
          <button className="py-2 px-1 bg-[#2E7D1F] text-white font-montserrat text-[0.63rem] font-bold rounded flex items-center justify-center gap-1">
            📞 Call
          </button>
          <button className="py-2 px-1 bg-[#F5921E] text-white font-montserrat text-[0.63rem] font-bold rounded flex items-center justify-center gap-1">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
