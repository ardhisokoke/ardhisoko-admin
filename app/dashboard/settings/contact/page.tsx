"use client";
import { useSiteStore } from "@/lib/store";
import { Card, CardHeader } from "@/components/ui/Card";
import { FormField, Input } from "@/components/ui/FormField";

export default function ContactPage() {
  const contact = useSiteStore((s) => s.data.contact);
  const updateContact = useSiteStore((s) => s.updateContact);

  const up = (key: string, value: string) => updateContact({ [key]: value } as never);

  return (
    <Card>
      <CardHeader title="📞 Contact Details" />
      <p className="text-[0.84rem] text-[#666] mb-5 leading-relaxed">
        These details appear in the website header, footer, and enquiry sections.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Phone Number">
          <Input
            type="tel"
            value={contact.phone}
            onChange={(e) => up("phone", e.target.value)}
            placeholder="+254 712 345 678"
          />
        </FormField>
        <FormField label="Email Address">
          <Input
            type="email"
            value={contact.email}
            onChange={(e) => up("email", e.target.value)}
            placeholder="info@ardhisoko.co.ke"
          />
        </FormField>
        <FormField label="WhatsApp Number" hint="Include country code, no spaces e.g. +254712345678">
          <Input
            type="tel"
            value={contact.whatsapp}
            onChange={(e) => up("whatsapp", e.target.value)}
            placeholder="+254712345678"
          />
        </FormField>
        <FormField label="Office Address">
          <Input
            value={contact.address}
            onChange={(e) => up("address", e.target.value)}
            placeholder="Nairobi, Kenya"
          />
        </FormField>
        <FormField label="Facebook URL">
          <Input
            type="url"
            value={contact.facebook}
            onChange={(e) => up("facebook", e.target.value)}
            placeholder="https://facebook.com/ardhisoko"
          />
        </FormField>
        <FormField label="Instagram URL">
          <Input
            type="url"
            value={contact.instagram}
            onChange={(e) => up("instagram", e.target.value)}
            placeholder="https://instagram.com/ardhisoko"
          />
        </FormField>
        <FormField label="YouTube URL" hint="Optional">
          <Input
            type="url"
            value={contact.youtube}
            onChange={(e) => up("youtube", e.target.value)}
            placeholder="https://youtube.com/@ardhisoko"
          />
        </FormField>
      </div>
    </Card>
  );
}
