"use client";

interface FeatureListProps {
  features: string[];
  onChange: (features: string[]) => void;
  placeholder?: string;
}

export function FeatureList({ features, onChange, placeholder = "New feature" }: FeatureListProps) {
  function update(idx: number, val: string) {
    const next = [...features];
    next[idx] = val;
    onChange(next);
  }

  function remove(idx: number) {
    onChange(features.filter((_, i) => i !== idx));
  }

  function add() {
    onChange([...features, ""]);
  }

  return (
    <div>
      <div className="flex flex-col gap-2 mt-1">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={f}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border-[1.5px] border-[#E0E0E0] rounded text-[0.83rem] outline-none focus:border-[#F5921E] transition-colors font-opensans"
            />
            <button
              onClick={() => remove(i)}
              className="w-7 h-7 border-[1.5px] border-[#E0E0E0] text-[#666] rounded flex items-center justify-center text-[0.78rem] hover:bg-[#E53935] hover:border-[#E53935] hover:text-white transition-all flex-shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={add}
        className="mt-2 w-full border-[1.5px] border-dashed border-[#E0E0E0] text-[#666] py-2 rounded font-montserrat text-[0.68rem] font-bold uppercase tracking-wide cursor-pointer hover:border-[#F5921E] hover:text-[#F5921E] transition-all"
      >
        + Add Feature
      </button>
    </div>
  );
}
