"use client";
import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useSiteStore } from "@/lib/store";
import { Card, CardHeader, Divider, SectionSep } from "@/components/ui/Card";
import { FormField, Input, Textarea, Select } from "@/components/ui/FormField";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { FeatureList } from "@/components/ui/FeatureList";
import { ProjectCardPreview } from "@/components/project/ProjectCardPreview";
import { GalleryManager } from "@/components/project/GalleryManager";
import { SpecsEditor } from "@/components/project/SpecsEditor";
import { PaymentPlansEditor } from "@/components/project/PaymentPlansEditor";
import clsx from "clsx";

const TABS = [
  { id: "card", label: "🏠 Homepage Card" },
  { id: "gallery", label: "📷 Gallery (5 Photos)" },
  { id: "details", label: "📄 Page Details" },
  { id: "plans", label: "💰 Payment Plans" },
];

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState("card");

  const project = useSiteStore((s) => s.data.projects.find((p) => p.id === id));
  const updateProject = useSiteStore((s) => s.updateProject);

  if (!project) return notFound();

  const up = (key: string, value: unknown) => updateProject(id, { [key]: value } as never);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <a
          href={`https://ardhisoko.co.ke/${id === "ma" ? "malindi" : id === "ko" ? "konza" : "kamakis"}.html`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#2E7D1F] hover:bg-[#1E5A12] text-white font-montserrat text-[0.7rem] font-bold px-4 py-2 rounded transition-colors"
        >
          🔗 Open Live Page
        </a>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-[#E0E0E0] mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              "px-5 py-2 font-montserrat text-[0.72rem] font-bold uppercase tracking-wide border-b-2 -mb-[2px] transition-all",
              tab === t.id
                ? "text-[#F5921E] border-[#F5921E]"
                : "text-[#666] border-transparent hover:text-[#F5921E]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: HOMEPAGE CARD ── */}
      {tab === "card" && (
        <Card>
          <CardHeader
            title="Homepage Card Info"
            badge={{ text: project.type === "apt" ? "Apartments" : "Land for Sale", variant: "green" }}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Project Name">
              <Input value={project.name} onChange={(e) => up("name", e.target.value)} />
            </FormField>
            <FormField label="Location">
              <Input value={project.location} onChange={(e) => up("location", e.target.value)} />
            </FormField>
            <FormField label="Price">
              <Input value={project.price} onChange={(e) => up("price", e.target.value)} />
            </FormField>
            <FormField label="Price Subtitle">
              <Input value={project.priceSubtitle} onChange={(e) => up("priceSubtitle", e.target.value)} />
            </FormField>
            <FormField label="Plot Size">
              <Input value={project.plotSize} onChange={(e) => up("plotSize", e.target.value)} />
            </FormField>
            <FormField label="Status Badge">
              <Input value={project.statusBadge} onChange={(e) => up("statusBadge", e.target.value)} />
            </FormField>
            <FormField label="Property Type">
              <Select value={project.type} onChange={(e) => up("type", e.target.value)}>
                <option value="land">Land for Sale</option>
                <option value="apt">Apartments</option>
                <option value="house">Houses</option>
                <option value="commercial">Commercial</option>
              </Select>
            </FormField>
            <FormField label="Short Description (card)" fullWidth>
              <Textarea
                value={project.shortDesc}
                onChange={(e) => up("shortDesc", e.target.value)}
                style={{ minHeight: "80px" }}
              />
            </FormField>
          </div>

          <Divider />

          <p className="font-montserrat text-[0.6rem] font-bold tracking-widest uppercase text-[#666] mb-2">
            Card Image (Cover Photo)
          </p>
          <ImageUpload
            value={project.imageUrl}
            onChange={(url) => up("imageUrl", url)}
            hint="Cover photo shown on the homepage project card"
          />

          {/* Card preview */}
          <div className="mt-5 bg-[#F5F5F5] border-[1.5px] border-[#E0E0E0] rounded-lg p-5">
            <p className="font-montserrat text-[0.6rem] font-bold tracking-widest uppercase text-[#666] mb-4 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#F5921E] inline-block" /> Live Card Preview
            </p>
            <ProjectCardPreview project={project} />
            <p className="text-[0.68rem] text-[#666] text-center mt-3 italic">
              This is exactly how your project card will appear on the website
            </p>
          </div>

          <Divider />

          <FormField label="Card Feature Tags">
            <FeatureList
              features={project.features}
              onChange={(features) => up("features", features)}
            />
          </FormField>
        </Card>
      )}

      {/* ── TAB: GALLERY ── */}
      {tab === "gallery" && (
        <Card>
          <CardHeader title="📷 Product Page Gallery" badge={{ text: "5 Photos", variant: "green" }} />
          <p className="text-[0.84rem] text-[#666] mb-4 leading-relaxed">
            Upload or paste URLs for up to 5 photos shown in the gallery on the <strong>{project.name}</strong> product page.
            Photo 1 is the main cover image.
          </p>
          <GalleryManager
            slots={project.gallery}
            onChange={(gallery) => up("gallery", gallery)}
            projectName={project.name}
          />
        </Card>
      )}

      {/* ── TAB: PAGE DETAILS ── */}
      {tab === "details" && (
        <Card>
          <CardHeader title="📄 Product Page Details" />

          <SectionSep label="Price Bar" />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Availability Badge Text">
              <Input value={project.availBadge} onChange={(e) => up("availBadge", e.target.value)} />
            </FormField>
            <FormField label="Availability Note">
              <Input value={project.availNote} onChange={(e) => up("availNote", e.target.value)} />
            </FormField>
          </div>

          <SectionSep label="About This Property" />
          <FormField label="Full Property Description (shown on product page)">
            <Textarea
              value={project.fullDesc}
              onChange={(e) => up("fullDesc", e.target.value)}
              style={{ minHeight: "130px" }}
            />
          </FormField>

          <SectionSep label="Key Details Grid (6 specs)" />
          <SpecsEditor
            specs={project.specs}
            onChange={(specs) => up("specs", specs)}
          />

          <SectionSep label="Features List (product page)" />
          <div className="grid grid-cols-2 gap-2">
            <FeatureList
              features={project.detailFeatures}
              onChange={(df) => up("detailFeatures", df)}
            />
          </div>
        </Card>
      )}

      {/* ── TAB: PAYMENT PLANS ── */}
      {tab === "plans" && (
        <Card>
          <CardHeader title="💰 Flexible Payment Plans" />
          <PaymentPlansEditor
            plans={project.paymentPlans}
            onChange={(plans) => up("paymentPlans", plans)}
            projectName={project.name}
          />
        </Card>
      )}
    </div>
  );
}
