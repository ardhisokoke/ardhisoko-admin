"use client";
import { useSiteStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function DashboardPage() {
  const projects = useSiteStore((s) => s.data.projects);

  const statCards = [
    { label: "Active Projects", value: projects.length.toString(), color: "border-t-[#F5921E]" },
    { label: `${projects[0]?.name ?? "Malindi"} Price`, value: projects[0]?.price ?? "—", color: "border-t-[#2E7D1F]" },
    { label: `${projects[1]?.name ?? "Konza"} Price`, value: projects[1]?.price ?? "—", color: "border-t-[#2E7D1F]" },
    { label: `${projects[2]?.name ?? "Kamakis"} Price`, value: projects[2]?.price ?? "—", color: "border-t-[#1A1A1A]" },
  ];

  return (
    <div>
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {statCards.map((s) => (
          <div key={s.label} className={`bg-white rounded-md border border-[#E0E0E0] border-t-[3px] ${s.color} p-5`}>
            <div className="font-montserrat text-[1.45rem] font-black">{s.value}</div>
            <div className="text-[0.68rem] text-[#666] font-semibold uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Guide */}
      <Card>
        <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-[#F5921E]">
          <h2 className="font-montserrat text-[0.86rem] font-extrabold uppercase tracking-wide">Quick Guide</h2>
        </div>
        <p className="text-[0.86rem] text-[#666] leading-[1.75] mb-5">
          Use the sidebar to edit each project. When done, click{" "}
          <strong>Export Website</strong> to download your updated files and push them to GitHub.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {projects.map((p, i) => {
            const colors = ["border-[#2E7D1F]", "border-[#F5921E]", "border-[#1A1A1A]"];
            return (
              <Link
                key={p.id}
                href={`/dashboard/projects/${p.id}`}
                className={`block p-4 bg-[#F5F5F5] rounded-md border-l-4 ${colors[i]} hover:shadow-sm transition-shadow`}
              >
                <div className="font-montserrat font-extrabold text-[0.82rem] mb-1">{p.name}</div>
                <div className="text-[0.74rem] text-[#666]">{p.price} · {p.location}</div>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        {[
          { href: "/dashboard/settings/banners", icon: "🌈", title: "Why Banners", desc: "Edit 4 confidence cards" },
          { href: "/dashboard/settings/testimonials", icon: "⭐", title: "Testimonials", desc: "Edit 3 customer reviews" },
          { href: "/dashboard/settings/blog", icon: "📰", title: "Blog Posts", desc: "Edit 6 property articles" },
          { href: "/dashboard/settings/contact", icon: "📞", title: "Contact Details", desc: "Phone, email, WhatsApp" },
          { href: "/dashboard/settings/logo", icon: "🎨", title: "Logo & Branding", desc: "Name, tagline, hero image" },
          { href: "/dashboard/deploy", icon: "🚀", title: "Deploy", desc: "Push to GitHub" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block bg-white border border-[#E0E0E0] rounded-md p-4 hover:border-[#F5921E] hover:shadow-sm transition-all"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-montserrat font-bold text-[0.82rem] mb-1">{item.title}</div>
            <div className="text-[0.72rem] text-[#666]">{item.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
