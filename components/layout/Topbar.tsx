"use client";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSiteStore } from "@/lib/store";
import toast from "react-hot-toast";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/projects/ma": "🏖️ Malindi Ocean View Acres",
  "/dashboard/projects/ko": "🌍 Konza Technopolis Plots",
  "/dashboard/projects/ka": "🏢 Kamakis Urban Residences",
  "/dashboard/settings/contact": "📞 Contact Details",
  "/dashboard/settings/logo": "🎨 Logo & Branding",
  "/dashboard/settings/banners": "🌈 Why Banners",
  "/dashboard/settings/testimonials": "⭐ Testimonials",
  "/dashboard/settings/blog": "📰 Blog Posts",
  "/dashboard/settings/password": "🔒 Change Password",
  "/dashboard/deploy": "🔗 Push to GitHub",
};

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isDirty, markSaved } = useSiteStore();

  const title = pageTitles[pathname] ?? "Dashboard";

  function handleSave() {
    markSaved();
    toast.success("Changes saved!");
  }

  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <div className="bg-white border-b border-[#E0E0E0] px-7 h-14 flex items-center justify-between flex-shrink-0">
      <div className="font-montserrat text-[0.95rem] font-extrabold">{title}</div>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => router.push("/dashboard/deploy")}
          className="px-4 py-2 rounded font-montserrat text-[0.71rem] font-bold tracking-wide uppercase border-[1.5px] border-[#E0E0E0] text-[#666] hover:border-[#F5921E] hover:text-[#F5921E] transition-all"
        >
          📤 Export
        </button>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded font-montserrat text-[0.71rem] font-bold tracking-wide uppercase transition-all text-white ${
            isDirty
              ? "bg-[#F5921E] hover:bg-[#D97A10]"
              : "bg-[#E0E0E0] text-[#999] cursor-default"
          }`}
        >
          💾 Save Changes{isDirty ? " *" : ""}
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded font-montserrat text-[0.71rem] font-bold tracking-wide uppercase border-[1.5px] border-[#E53935]/40 text-[#E53935] hover:border-[#E53935] transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
