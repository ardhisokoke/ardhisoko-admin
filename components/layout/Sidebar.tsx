"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSiteStore } from "@/lib/store";

const navItems = [
  { section: "Overview", items: [{ href: "/dashboard", label: "Dashboard", icon: "🏠" }] },
  {
    section: "Projects",
    items: [
      { href: "/dashboard/projects/ma", label: "Malindi Plots", icon: "🏖️" },
      { href: "/dashboard/projects/ko", label: "Konza Plots", icon: "🌍" },
      { href: "/dashboard/projects/ka", label: "Kamakis Apts", icon: "🏢" },
    ],
  },
  {
    section: "Site Settings",
    items: [
      { href: "/dashboard/settings/contact", label: "Contact Details", icon: "📞" },
      { href: "/dashboard/settings/logo", label: "Logo & Branding", icon: "🎨" },
      { href: "/dashboard/settings/banners", label: "Why Banners", icon: "🌈" },
      { href: "/dashboard/settings/testimonials", label: "Testimonials", icon: "⭐" },
      { href: "/dashboard/settings/blog", label: "Blog Posts", icon: "📰" },
      { href: "/dashboard/deploy", label: "Push to GitHub", icon: "🔗" },
    ],
  },
  {
    section: "Account",
    items: [{ href: "/dashboard/settings/password", label: "Change Password", icon: "🔒" }],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const isDirty = useSiteStore((s) => s.isDirty);

  return (
    <div className="w-[252px] bg-[#1A1A1A] flex-shrink-0 flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-white/[0.08] flex items-center gap-2">
        <div
          className="w-0 h-0 flex-shrink-0"
          style={{
            borderLeft: "9px solid transparent",
            borderRight: "9px solid transparent",
            borderBottom: "16px solid #2E7D1F",
          }}
        />
        <div>
          <div className="font-montserrat text-[1.18rem] font-extrabold">
            <span className="text-white">Ardhi</span>
            <span className="text-[#F5921E]">Soko</span>
          </div>
          <div className="text-[0.58rem] text-white/25 tracking-widest uppercase mt-px">
            Admin Panel
          </div>
        </div>
        {isDirty && (
          <span className="ml-auto w-2 h-2 rounded-full bg-[#F5921E] flex-shrink-0" title="Unsaved changes" />
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2">
        {navItems.map((group) => (
          <div key={group.section} className="px-3 py-2">
            <p className="text-[0.57rem] font-montserrat font-bold tracking-[0.22em] uppercase text-white/20 px-2 mb-1">
              {group.section}
            </p>
            {group.items.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-2 rounded text-[0.77rem] font-montserrat font-semibold mb-0.5 transition-all",
                    active
                      ? "bg-[#2E7D1F] text-white"
                      : "text-white/48 hover:bg-white/[0.06] hover:text-white/82"
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-5 py-3 border-t border-white/[0.06] text-[0.68rem] text-white/17">
        ArdhiSoko Admin v2.0
      </div>
    </div>
  );
}
