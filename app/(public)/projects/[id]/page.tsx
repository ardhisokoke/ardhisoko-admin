"use client";
import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useSiteStore } from "@/lib/store";
import { SiteNav } from "@/components/public/SiteNav";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { projects, contact } = useSiteStore((s) => s.data);
  const [activePhoto, setActivePhoto] = useState(0);

  const project = projects.find((p) => p.id === id);
  if (!project) return notFound();

  const gallery = project.gallery.filter((g) => g.url);
  const isApt = project.type === "apt";
  const typeLabel = isApt ? "Apartments" : "Land for Sale";

  function whatsappUrl(text?: string) {
    return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
      text || `Hi, I'm interested in ${project.name}. Please send me more details.`
    )}`;
  }

  return (
    <>
      <SiteNav />

      {/* ── HERO STRIP ───────────────────────────────────────────── */}
      <div className="bg-[#1A1A1A] px-6 md:px-16 py-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 font-montserrat text-[0.72rem] font-bold mb-5 transition-colors"
        >
          ← Back to All Projects
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <span className={`inline-block text-white font-montserrat text-[0.62rem] font-extrabold px-2 py-1 rounded-sm uppercase tracking-wide mb-3 ${isApt ? "bg-[#333]" : "bg-[#2E7D1F]"}`}>
              {typeLabel}
            </span>
            <h1 className="font-montserrat text-3xl md:text-4xl font-black text-white leading-tight">
              {project.name}
            </h1>
            <p className="text-white/50 text-[0.88rem] mt-2">📍 {project.location}</p>
          </div>
          <div className="text-right">
            <div className="font-montserrat text-3xl font-black text-[#F5921E]">{project.price}</div>
            <div className="text-white/50 text-[0.8rem] mt-1">{project.priceSubtitle}</div>
          </div>
        </div>
      </div>

      {/* ── PRICE BAR ────────────────────────────────────────────── */}
      <div className="bg-[#F5921E] px-6 md:px-16 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="bg-white/20 text-white font-montserrat text-[0.72rem] font-bold px-3 py-1.5 rounded-full">
            {project.availBadge}
          </span>
          <span className="text-white/80 text-[0.82rem]">{project.availNote}</span>
        </div>
        <div className="flex gap-2">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-[#25D366] text-white font-montserrat text-[0.75rem] font-bold rounded hover:bg-[#1ea852] transition-colors"
          >
            💬 WhatsApp
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="px-4 py-2 bg-white text-[#F5921E] font-montserrat text-[0.75rem] font-bold rounded hover:bg-white/90 transition-colors"
          >
            📞 Call Now
          </a>
        </div>
      </div>

      {/* ── GALLERY ──────────────────────────────────────────────── */}
      {gallery.length > 0 && (
        <div className="px-6 md:px-16 py-6 bg-[#111]">
          {/* Main photo */}
          <div className="relative aspect-[16/7] rounded-xl overflow-hidden mb-3">
            <img
              src={gallery[activePhoto]?.url}
              alt={`${project.name} photo ${activePhoto + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className={`flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                    i === activePhoto ? "border-[#F5921E]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={g.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── CONTENT + SIDEBAR ────────────────────────────────────── */}
      <div className="px-6 md:px-16 py-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2">
            {/* About */}
            <h2 className="font-montserrat text-2xl font-black mb-4">About {project.name}</h2>
            <p className="text-[#555] leading-[1.85] text-[0.95rem] mb-10">{project.fullDesc}</p>

            {/* Key details */}
            <h2 className="font-montserrat text-2xl font-black mb-5">Key Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
              {project.specs.map((s, i) => (
                <div key={i} className="bg-[#F5F5F5] rounded-lg p-4 border-l-[3px] border-[#F5921E]">
                  <div className="font-montserrat text-[1.15rem] font-black text-[#1A1A1A]">{s.value}</div>
                  <div className="text-[0.65rem] text-[#999] uppercase tracking-wide mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <h2 className="font-montserrat text-2xl font-black mb-5">Features & Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
              {project.detailFeatures.filter(Boolean).map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2 border-b border-[#F0F0F0]">
                  <span className="w-5 h-5 rounded-full bg-[#E8F5E4] text-[#2E7D1F] font-bold text-[0.65rem] flex items-center justify-center flex-shrink-0">✓</span>
                  <span className="font-montserrat text-[0.85rem] font-semibold">{f}</span>
                </div>
              ))}
            </div>

            {/* Payment Plans */}
            <h2 className="font-montserrat text-2xl font-black mb-2">Flexible Payment Plans</h2>
            <p className="text-[#666] text-[0.88rem] mb-5">Choose the plan that works best for you.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.paymentPlans.map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-5 text-center border-t-4 ${
                    plan.featured
                      ? "bg-[#2E7D1F] border-[#1E5A12] text-white"
                      : "bg-[#F5F5F5] border-[#F5921E]"
                  }`}
                >
                  {plan.featured && (
                    <div className="font-montserrat text-[0.58rem] font-extrabold text-[#F5921E] uppercase tracking-widest mb-2">
                      ★ Most Popular
                    </div>
                  )}
                  <div className={`font-montserrat text-[0.8rem] font-bold mb-1 ${plan.featured ? "text-white/80" : "text-[#444]"}`}>
                    {plan.label}
                  </div>
                  <div className={`font-montserrat text-[2rem] font-black mb-2 ${plan.featured ? "text-white" : "text-[#F5921E]"}`}>
                    {plan.deposit}
                  </div>
                  <p className={`text-[0.78rem] leading-relaxed whitespace-pre-line ${plan.featured ? "text-white/70" : "text-[#666]"}`}>
                    {plan.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky CTA sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl border border-[#E0E0E0] shadow-xl p-6">
              <div className="font-montserrat text-[2rem] font-black text-[#2E7D1F]">{project.price}</div>
              <div className="text-[0.78rem] text-[#999] mb-5">{project.priceSubtitle}</div>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3.5 bg-[#25D366] hover:bg-[#1ea852] text-white font-montserrat font-bold text-[0.85rem] rounded-lg text-center transition-all mb-2.5 hover:scale-[1.02] active:scale-95"
              >
                💬 WhatsApp Us Now
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="block w-full py-3.5 bg-[#2E7D1F] hover:bg-[#1E5A12] text-white font-montserrat font-bold text-[0.85rem] rounded-lg text-center transition-all mb-2.5"
              >
                📞 Call {contact.phone}
              </a>
              <button
                onClick={() => document.getElementById("enquiry-section")?.scrollIntoView({ behavior: "smooth" })}
                className="block w-full py-3.5 border-2 border-[#F5921E] text-[#F5921E] hover:bg-[#F5921E] hover:text-white font-montserrat font-bold text-[0.85rem] rounded-lg text-center transition-all"
              >
                Send Enquiry Form
              </button>

              <div className="mt-5 pt-4 border-t border-[#F0F0F0] text-center text-[0.72rem] text-[#AAA]">
                {project.availNote}
              </div>

              {/* Feature highlights */}
              <div className="mt-5 flex flex-col gap-2">
                {project.features.slice(0, 5).map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-[0.78rem] text-[#555]">
                    <span className="text-[#2E7D1F] font-bold">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA BAND ─────────────────────────────────────────────── */}
      <div id="enquiry-section" className="bg-[#F5921E] px-6 md:px-16 py-14 text-center">
        <h2 className="font-montserrat text-3xl font-black text-white mb-3">
          Ready to secure your {isApt ? "unit" : "plot"}?
        </h2>
        <p className="text-white/75 text-[0.95rem] mb-6 max-w-md mx-auto">
          Contact us now — our team is available to answer your questions and arrange a site visit.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={whatsappUrl(`Hi ArdhiSoko! I'd like to book a site visit for ${project.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3.5 bg-white text-[#F5921E] font-montserrat font-bold text-[0.9rem] rounded-lg hover:scale-105 active:scale-95 transition-all"
          >
            💬 Book Site Visit
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="px-7 py-3.5 bg-[#1A1A1A] text-white font-montserrat font-bold text-[0.9rem] rounded-lg hover:scale-105 active:scale-95 transition-all"
          >
            📞 {contact.phone}
          </a>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
