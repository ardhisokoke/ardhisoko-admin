"use client";
import { PaymentPlan } from "@/types";

interface PaymentPlansEditorProps {
  plans: PaymentPlan[];
  onChange: (plans: PaymentPlan[]) => void;
  projectName: string;
}

export function PaymentPlansEditor({ plans, onChange, projectName }: PaymentPlansEditorProps) {
  function update(idx: number, key: keyof PaymentPlan, value: string) {
    const next = plans.map((p, i) =>
      i === idx ? { ...p, [key]: value } : p
    );
    onChange(next);
  }

  return (
    <div>
      <p className="text-[0.84rem] text-[#666] mb-4 leading-relaxed">
        Edit the 3 payment options shown on the <strong>{projectName}</strong> product page. The middle option is highlighted as "Most Popular".
      </p>
      <div className="grid grid-cols-3 gap-3">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-[#F5F5F5] rounded-md p-4 border-t-[3px] relative ${
              plan.featured ? "border-[#2E7D1F]" : "border-[#F5921E]"
            }`}
          >
            {plan.featured && (
              <div className="font-montserrat text-[0.58rem] font-extrabold text-[#2E7D1F] uppercase tracking-widest mb-2">
                ★ Most Popular
              </div>
            )}
            <div className="mb-2">
              <label className="block font-montserrat text-[0.56rem] font-bold tracking-widest uppercase text-[#666] mb-1">Label</label>
              <input
                type="text"
                value={plan.label}
                onChange={(e) => update(idx, "label", e.target.value)}
                className="w-full border border-[#E0E0E0] rounded px-2 py-1.5 text-[0.82rem] outline-none focus:border-[#F5921E] font-opensans"
              />
            </div>
            <div className="mb-2">
              <label className="block font-montserrat text-[0.56rem] font-bold tracking-widest uppercase text-[#666] mb-1">Deposit %</label>
              <input
                type="text"
                value={plan.deposit}
                onChange={(e) => update(idx, "deposit", e.target.value)}
                className="w-full border border-[#E0E0E0] rounded px-2 py-1.5 text-[0.82rem] outline-none focus:border-[#F5921E] font-opensans"
              />
            </div>
            <div>
              <label className="block font-montserrat text-[0.56rem] font-bold tracking-widest uppercase text-[#666] mb-1">Detail</label>
              <textarea
                value={plan.detail}
                onChange={(e) => update(idx, "detail", e.target.value)}
                className="w-full border border-[#E0E0E0] rounded px-2 py-1.5 text-[0.78rem] outline-none focus:border-[#F5921E] font-opensans resize-none min-h-[50px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
