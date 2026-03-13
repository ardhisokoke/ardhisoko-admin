"use client";
import { useSiteStore } from "@/lib/store";
import { Card, CardHeader } from "@/components/ui/Card";
import { FormField, Input, Textarea } from "@/components/ui/FormField";

export default function TestimonialsPage() {
  const testimonials = useSiteStore((s) => s.data.testimonials);
  const updateTestimonial = useSiteStore((s) => s.updateTestimonial);

  return (
    <div>
      <Card>
        <CardHeader
          title="⭐ Testimonials"
          badge={{ text: "3 Reviews", variant: "green" }}
        />
        <p className="text-[0.84rem] text-[#666] mb-5 leading-relaxed">
          Edit the 3 testimonial cards shown in the{" "}
          <strong>"Trusted by real buyers"</strong> section.
        </p>

        <div className="flex flex-col gap-5">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E0E0E0] rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#F5921E]">
                <h3 className="font-montserrat text-[0.86rem] font-extrabold uppercase tracking-wide">
                  Testimonial {idx + 1}
                </h3>
                {/* Mini avatar preview */}
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#F5921E] flex items-center justify-center text-white font-montserrat text-[0.75rem] font-extrabold">
                    {t.initials || "??"}
                  </div>
                  <div>
                    <div className="font-montserrat text-[0.75rem] font-bold">{t.name}</div>
                    <div className="text-[0.65rem] text-[#666]">{t.role}</div>
                  </div>
                </div>
              </div>

              {/* Quote preview */}
              {t.quote && (
                <div className="bg-[#F5F5F5] border-l-4 border-[#F5921E] px-4 py-3 rounded-r mb-4">
                  <p className="text-[0.78rem] text-[#666] italic leading-relaxed line-clamp-2">
                    "{t.quote}"
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Initials (shown in avatar)" hint="Max 2 characters">
                  <Input
                    value={t.initials}
                    onChange={(e) =>
                      updateTestimonial(idx, { initials: e.target.value.slice(0, 2).toUpperCase() })
                    }
                    maxLength={2}
                    placeholder="JK"
                  />
                </FormField>
                <FormField label="Full Name">
                  <Input
                    value={t.name}
                    onChange={(e) => updateTestimonial(idx, { name: e.target.value })}
                    placeholder="James Kamau"
                  />
                </FormField>
                <FormField label="Role / Location" fullWidth>
                  <Input
                    value={t.role}
                    onChange={(e) => updateTestimonial(idx, { role: e.target.value })}
                    placeholder="Malindi Plot Owner — Nairobi"
                  />
                </FormField>
                <FormField label="Quote" fullWidth>
                  <Textarea
                    value={t.quote}
                    onChange={(e) => updateTestimonial(idx, { quote: e.target.value })}
                    style={{ minHeight: "100px" }}
                    placeholder="Customer's testimonial..."
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
