"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useSiteStore } from "@/lib/store";
import { SiteNav } from "@/components/public/SiteNav";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function HomePage() {
  const { projects, banners, testimonials, blogPosts, contact, logo } = useSiteStore((s) => s.data);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", project: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const enquiryRef = useRef<HTMLElement>(null);

  function handleEnquiry(e: React.FormEvent) {
    e.preventDefault();
    const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
      `Hi ArdhiSoko! I'm interested in ${enquiryForm.project || "your properties"}.\n\nName: ${enquiryForm.name}\nPhone: ${enquiryForm.phone}\n${enquiryForm.message ? "Message: " + enquiryForm.message : ""}`
    )}`;
    window.open(wa, "_blank");
    setSubmitted(true);
  }

  return (
    <>
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${logo.heroImage})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
        />

        <div className="relative z-10 px-6 md:px-16 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 font-montserrat text-[0.7rem] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F5921E] animate-pulse" />
            3 Premium Projects — Across Kenya
          </div>

          <h1 className="font-montserrat text-5xl md:text-7xl font-black text-white leading-[1.0] mb-6">
            Own Prime<br />
            Land.{" "}
            <span className="text-[#F5921E]">Invest</span>
            <br />
            Smart.
          </h1>

          <p className="text-white/70 text-[1rem] md:text-[1.1rem] leading-relaxed mb-8 max-w-xl">
            {logo.part1}{logo.part2} brings you hand-picked property investments — coastal plots in Malindi, tech-city land near Konza, and modern apartments in Kamakis.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 bg-[#F5921E] hover:bg-[#D97A10] text-white font-montserrat font-bold text-[0.88rem] rounded transition-all hover:scale-105 active:scale-95"
            >
              View Our Projects ↓
            </button>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 bg-[#25D366] hover:bg-[#1ea852] text-white font-montserrat font-bold text-[0.88rem] rounded transition-all hover:scale-105 active:scale-95"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-white text-[0.62rem] font-montserrat tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white animate-bounce" />
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────── */}
      <div className="bg-[#1A1A1A] px-6 md:px-16 py-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { num: "3", lbl: "Prime Locations" },
          { num: projects[0]?.plotSize ?? "1 Acre", lbl: "Malindi Plots" },
          { num: projects[1]?.plotSize ?? "1/8 Acre", lbl: "Konza Plots" },
          { num: projects[2]?.plotSize ?? "1BR–3BR", lbl: "Kamakis Units" },
          { num: "✓", lbl: "Title Deed Ready" },
        ].map((s) => (
          <div key={s.lbl} className="text-center border-r border-white/[0.06] last:border-0 px-2">
            <div className="font-montserrat text-[1.6rem] font-black text-[#F5921E]">{s.num}</div>
            <div className="text-[0.62rem] text-white/35 uppercase tracking-widest mt-0.5">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── PROJECTS ─────────────────────────────────────────────── */}
      <section id="projects" className="px-6 md:px-16 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="font-montserrat text-[0.7rem] font-extrabold tracking-[0.2em] uppercase text-[#F5921E] mb-3">
            Our Projects
          </p>
          <h2 className="font-montserrat text-4xl md:text-5xl font-black mb-4 leading-tight">
            Three locations.<br />
            <span className="text-[#F5921E]">One trusted developer.</span>
          </h2>
          <p className="text-[#666] text-[0.95rem] leading-relaxed max-w-xl mb-14">
            Whether you are looking for a coastal retreat, a smart tech-city investment, or a modern apartment — {logo.part1}{logo.part2} has the right property for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => {
              const anchor = project.id === "ma" ? "malindi" : project.id === "ko" ? "konza" : "kamakis";
              const isApt = project.type === "apt";
              return (
                <div
                  key={project.id}
                  id={anchor}
                  className="group bg-white rounded-xl border border-[#E0E0E0] overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    {/* Price */}
                    <div className="absolute bottom-3 left-4 text-white font-montserrat">
                      <div className="text-[1.3rem] font-black">{project.price}</div>
                      <div className="text-[0.65rem] opacity-80">{project.priceSubtitle}</div>
                    </div>
                    {/* Tags */}
                    <span className={`absolute top-3 left-3 text-white font-montserrat text-[0.58rem] font-extrabold px-2 py-1 rounded-sm uppercase tracking-wide ${isApt ? "bg-[#1A1A1A]" : "bg-[#2E7D1F]"}`}>
                      {isApt ? "Apartments" : "Land for Sale"}
                    </span>
                    <span className="absolute top-3 right-3 bg-[#F5921E] text-white font-montserrat text-[0.58rem] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                      {project.statusBadge}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-[0.65rem] text-[#F5921E] font-montserrat font-bold tracking-widest uppercase mb-1">
                      📍 {project.location}
                    </p>
                    <h3 className="font-montserrat text-[1rem] font-black mb-2 leading-snug">
                      {project.name}
                    </h3>
                    <p className="text-[0.82rem] text-[#666] leading-relaxed mb-4 line-clamp-3">
                      {project.shortDesc}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.features.slice(0, 4).map((f) => (
                        <span key={f} className="bg-[#F5F5F5] font-montserrat text-[0.58rem] font-bold px-2 py-1 rounded-sm text-[#444]">
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi, I'm interested in " + project.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 bg-[#25D366] text-white font-montserrat text-[0.62rem] font-bold rounded flex items-center justify-center gap-1 hover:bg-[#1ea852] transition-colors"
                      >
                        💬 WhatsApp
                      </a>
                      <a
                        href={`tel:${contact.phone}`}
                        className="py-2 bg-[#2E7D1F] text-white font-montserrat text-[0.62rem] font-bold rounded flex items-center justify-center gap-1 hover:bg-[#1E5A12] transition-colors"
                      >
                        📞 Call
                      </a>
                      <Link
                        href={`/projects/${project.id}`}
                        className="py-2 bg-[#F5921E] text-white font-montserrat text-[0.62rem] font-bold rounded flex items-center justify-center hover:bg-[#D97A10] transition-colors"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY BUY WITH US ──────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <p className="font-montserrat text-[0.7rem] font-extrabold tracking-[0.2em] uppercase text-[#F5921E] mb-3">
            Why Buy With Us
          </p>
          <h2 className="font-montserrat text-4xl font-black mb-14">
            Buy with total <span className="text-[#F5921E]">confidence.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {banners.map((b, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden h-[280px] group">
                <img
                  src={b.img}
                  alt={b.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-[#F5921E] text-white font-montserrat text-[0.55rem] font-extrabold px-2 py-1 rounded-sm uppercase tracking-wide">
                  {b.tag}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-montserrat text-[0.9rem] font-extrabold text-white mb-1">{b.title}</div>
                  <p className="text-[0.72rem] text-white/70 leading-snug">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="font-montserrat text-[0.7rem] font-extrabold tracking-[0.2em] uppercase text-[#F5921E] mb-3">
            Trusted by Real Buyers
          </p>
          <h2 className="font-montserrat text-4xl font-black mb-14">
            What our <span className="text-[#F5921E]">clients say.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#F9F9F9] border border-[#E8E8E8] rounded-xl p-7 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#2E7D1F] text-white font-montserrat font-extrabold flex items-center justify-center mb-5">
                  {t.initials}
                </div>
                <p className="text-[0.88rem] text-[#444] leading-[1.8] mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="font-montserrat font-extrabold text-[0.88rem]">{t.name}</div>
                <div className="text-[0.72rem] text-[#999] mt-0.5">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <p className="font-montserrat text-[0.7rem] font-extrabold tracking-[0.2em] uppercase text-[#F5921E] mb-3">
            Property Insights
          </p>
          <h2 className="font-montserrat text-4xl font-black mb-14">
            Latest from <span className="text-[#F5921E]">our blog.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <div key={i} className="group bg-white rounded-xl overflow-hidden border border-[#E0E0E0] hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div
                  className="h-[190px] bg-cover bg-center relative transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${post.img})` }}
                >
                  <span className="absolute top-3 right-3 bg-[#F5921E] text-white font-montserrat text-[0.58rem] font-extrabold px-2 py-1 rounded-sm uppercase">
                    {post.statusBadge}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-montserrat text-[0.6rem] font-extrabold uppercase tracking-widest text-[#F5921E]">
                      {post.category}
                    </span>
                    <span className="text-[#DDD]">·</span>
                    <span className="text-[0.65rem] text-[#999]">📍 {post.location}</span>
                  </div>
                  <h3 className="font-montserrat text-[0.92rem] font-extrabold leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[0.8rem] text-[#666] leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-[0.68rem] text-[#AAA] border-t border-[#F0F0F0] pt-3">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ─────────────────────────────────────────── */}
      <section id="enquiry" ref={enquiryRef} className="px-6 md:px-16 py-20 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-montserrat text-[0.7rem] font-extrabold tracking-[0.2em] uppercase text-[#F5921E] mb-3">
              Get In Touch
            </p>
            <h2 className="font-montserrat text-4xl font-black text-white mb-3">
              Enquire <span className="text-[#F5921E]">Now</span>
            </h2>
            <p className="text-white/50 text-[0.9rem]">
              Fill in your details and we'll reach out within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-montserrat text-[1.3rem] font-black text-white mb-2">
                Opening WhatsApp…
              </h3>
              <p className="text-white/50 text-[0.9rem] mb-6">
                We've prepared your message. Complete it on WhatsApp to send.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 border border-white/20 text-white/60 font-montserrat text-[0.78rem] rounded hover:border-white/40 transition-colors"
              >
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleEnquiry} className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-montserrat text-[0.6rem] font-bold tracking-widest uppercase text-white/40 mb-2">
                  Your Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  placeholder="e.g. John Kamau"
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-white/25 rounded-lg px-4 py-3 text-[0.9rem] outline-none focus:border-[#F5921E] transition-colors"
                />
              </div>
              <div>
                <label className="block font-montserrat text-[0.6rem] font-bold tracking-widest uppercase text-white/40 mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  required
                  type="tel"
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-white/25 rounded-lg px-4 py-3 text-[0.9rem] outline-none focus:border-[#F5921E] transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-montserrat text-[0.6rem] font-bold tracking-widest uppercase text-white/40 mb-2">
                  Which Project?
                </label>
                <select
                  value={enquiryForm.project}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, project: e.target.value })}
                  className="w-full bg-white/10 border border-white/15 text-white rounded-lg px-4 py-3 text-[0.9rem] outline-none focus:border-[#F5921E] transition-colors appearance-none"
                >
                  <option value="" className="bg-[#1A1A1A]">Select a project…</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.name} className="bg-[#1A1A1A]">{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-montserrat text-[0.6rem] font-bold tracking-widest uppercase text-white/40 mb-2">
                  Message (optional)
                </label>
                <textarea
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  placeholder="Any questions or specific requirements?"
                  rows={3}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-white/25 rounded-lg px-4 py-3 text-[0.9rem] outline-none focus:border-[#F5921E] transition-colors resize-none"
                />
              </div>
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#F5921E] hover:bg-[#D97A10] text-white font-montserrat font-bold text-[0.9rem] rounded-lg transition-all hover:scale-[1.02] active:scale-95"
                >
                  Send via WhatsApp →
                </button>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 py-4 border border-white/20 hover:border-white/40 text-white font-montserrat font-bold text-[0.9rem] rounded-lg transition-colors text-center"
                >
                  📞 Call {contact.phone}
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
