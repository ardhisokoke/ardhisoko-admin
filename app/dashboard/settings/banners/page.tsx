"use client";
import { useSiteStore } from "@/lib/store";
import { Card, CardHeader } from "@/components/ui/Card";
import { FormField, Input, Textarea } from "@/components/ui/FormField";
import { ImageUpload } from "@/components/ui/ImageUpload";

export default function BannersPage() {
  const banners = useSiteStore((s) => s.data.banners);
  const updateBanner = useSiteStore((s) => s.updateBanner);

  return (
    <div>
      <Card>
        <CardHeader
          title='🌈 Why Banners'
          badge={{ text: "4 Slides", variant: "green" }}
        />
        <p className="text-[0.84rem] text-[#666] mb-5 leading-relaxed">
          These are the 4 banner cards in the{" "}
          <strong>"Buy with total confidence"</strong> section. Upload a photo
          and edit the title, tag, and description for each.
        </p>

        <div className="grid grid-cols-2 gap-5">
          {banners.map((banner, idx) => (
            <div
              key={idx}
              className="bg-[#F5F5F5] rounded-lg overflow-hidden border-[1.5px] border-[#E0E0E0]"
            >
              {/* Preview */}
              <div className="h-[140px] relative overflow-hidden bg-gray-200">
                {banner.img && (
                  <img
                    src={banner.img}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <span className="absolute top-2 left-2 bg-[#F5921E] text-white font-montserrat text-[0.55rem] font-extrabold tracking-widest uppercase px-2 py-1 rounded-sm">
                  {banner.tag || "Tag"}
                </span>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="font-montserrat text-[0.75rem] font-extrabold text-white uppercase">
                    {banner.title || "Title"}
                  </div>
                  <div className="text-[0.62rem] text-white/75 mt-0.5 leading-snug">
                    {banner.desc || "Description"}
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="p-4">
                <p className="font-montserrat text-[0.6rem] font-extrabold tracking-widest uppercase text-[#F5921E] mb-3">
                  Banner {idx + 1}
                </p>
                <ImageUpload
                  value={banner.img}
                  onChange={(url) => updateBanner(idx, { img: url })}
                  label="Upload banner photo"
                  height="80px"
                />
                <FormField label="Tag">
                  <Input
                    value={banner.tag}
                    onChange={(e) => updateBanner(idx, { tag: e.target.value })}
                    placeholder="e.g. Legal"
                  />
                </FormField>
                <FormField label="Title">
                  <Input
                    value={banner.title}
                    onChange={(e) => updateBanner(idx, { title: e.target.value })}
                    placeholder="e.g. Title Deed Verified"
                  />
                </FormField>
                <FormField label="Description">
                  <Textarea
                    value={banner.desc}
                    onChange={(e) => updateBanner(idx, { desc: e.target.value })}
                    style={{ minHeight: "60px" }}
                    placeholder="Short supporting text..."
                  />
                </FormField>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
