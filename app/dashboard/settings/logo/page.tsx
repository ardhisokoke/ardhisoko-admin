"use client";
import { useSiteStore } from "@/lib/store";
import { Card, CardHeader, Divider } from "@/components/ui/Card";
import { FormField, Input } from "@/components/ui/FormField";
import { ImageUpload } from "@/components/ui/ImageUpload";

export default function LogoPage() {
  const logo = useSiteStore((s) => s.data.logo);
  const updateLogo = useSiteStore((s) => s.updateLogo);
  const up = (k: string, v: string) => updateLogo({ [k]: v } as never);

  return (
    <div>
      <Card>
        <CardHeader title="🎨 Logo & Branding" />
        <p className="text-[0.86rem] text-[#666] mb-5 leading-relaxed">
          Edit the brand name, tagline, and hero section image shown on the homepage.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <FormField label='Brand Name Part 1 (e.g. "Ardhi")' hint='Displayed in black'>
            <Input
              value={logo.part1}
              onChange={(e) => up("part1", e.target.value)}
              placeholder="Ardhi"
            />
          </FormField>
          <FormField label='Brand Name Part 2 (e.g. "Soko")' hint="Displayed in orange">
            <Input
              value={logo.part2}
              onChange={(e) => up("part2", e.target.value)}
              placeholder="Soko"
            />
          </FormField>
          <FormField label="Tagline" fullWidth>
            <Input
              value={logo.tagline}
              onChange={(e) => up("tagline", e.target.value)}
              placeholder="Kenya's Trusted Land Marketplace"
            />
          </FormField>
        </div>

        {/* Live logo preview */}
        <div className="mt-2 mb-5 bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg p-5 flex items-center gap-3">
          <div
            className="w-0 h-0 flex-shrink-0"
            style={{
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderBottom: "16px solid #2E7D1F",
            }}
          />
          <div>
            <div className="font-montserrat text-xl font-extrabold">
              <span className="text-[#1A1A1A]">{logo.part1 || "Ardhi"}</span>
              <span className="text-[#F5921E]">{logo.part2 || "Soko"}</span>
            </div>
            <div className="text-[0.68rem] text-[#666] mt-0.5">{logo.tagline}</div>
          </div>
        </div>

        <Divider />

        <p className="font-montserrat text-[0.6rem] font-bold tracking-widest uppercase text-[#666] mb-3">
          Hero Section Background Image
        </p>
        <ImageUpload
          value={logo.heroImage}
          onChange={(url) => up("heroImage", url)}
          height="180px"
          hint="Large image shown behind the hero headline on the homepage"
        />

        {/* Hero preview */}
        {logo.heroImage && (
          <div
            className="relative mt-3 rounded-lg overflow-hidden"
            style={{ height: "180px" }}
          >
            <img
              src={logo.heroImage}
              alt="Hero preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end p-4">
              <div className="text-white font-montserrat text-[0.82rem] font-bold">
                {logo.heroOverlayText || "Own Prime Land. Invest Smart."}
              </div>
            </div>
          </div>
        )}

        <Divider />

        <FormField label="Hero Overlay Text" hint="Short headline shown over the hero image">
          <Input
            value={logo.heroOverlayText}
            onChange={(e) => up("heroOverlayText", e.target.value)}
            placeholder="Own Prime Land. Invest Smart."
          />
        </FormField>
      </Card>
    </div>
  );
}
