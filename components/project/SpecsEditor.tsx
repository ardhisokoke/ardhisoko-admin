"use client";
import { Spec } from "@/types";

interface SpecsEditorProps {
  specs: Spec[];
  onChange: (specs: Spec[]) => void;
}

export function SpecsEditor({ specs, onChange }: SpecsEditorProps) {
  function update(idx: number, key: keyof Spec, value: string) {
    const next = specs.map((s, i) =>
      i === idx ? { ...s, [key]: value } : s
    );
    onChange(next);
  }

  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
      {specs.map((spec, idx) => (
        <div
          key={idx}
          className="grid grid-cols-2 gap-2 bg-[#F5F5F5] p-3 rounded border-l-[3px] border-[#F5921E]"
        >
          <div>
            <label className="block font-montserrat text-[0.56rem] font-bold tracking-widest uppercase text-[#666] mb-1">Value</label>
            <input
              type="text"
              value={spec.value}
              onChange={(e) => update(idx, "value", e.target.value)}
              className="w-full border border-[#E0E0E0] rounded px-2 py-1.5 text-[0.82rem] outline-none focus:border-[#F5921E] font-opensans"
            />
          </div>
          <div>
            <label className="block font-montserrat text-[0.56rem] font-bold tracking-widest uppercase text-[#666] mb-1">Label</label>
            <input
              type="text"
              value={spec.label}
              onChange={(e) => update(idx, "label", e.target.value)}
              className="w-full border border-[#E0E0E0] rounded px-2 py-1.5 text-[0.82rem] outline-none focus:border-[#F5921E] font-opensans"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
