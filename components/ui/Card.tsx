import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-md border border-[#E0E0E0] p-7 mb-5",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  badge?: { text: string; variant?: "green" | "orange" };
  className?: string;
}

export function CardHeader({ title, badge, className }: CardHeaderProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between mb-5 pb-3 border-b-2 border-[#F5921E]",
        className
      )}
    >
      <h2 className="font-montserrat text-[0.86rem] font-extrabold uppercase tracking-wide">
        {title}
      </h2>
      {badge && (
        <span
          className={clsx(
            "text-[0.64rem] font-bold px-3 py-1 rounded-full",
            badge.variant === "green"
              ? "bg-[#E8F5E4] text-[#2E7D1F]"
              : "bg-[#FFF3E0] text-[#F5921E]"
          )}
        >
          {badge.text}
        </span>
      )}
    </div>
  );
}

export function Divider() {
  return <div className="h-px bg-[#E0E0E0] my-5" />;
}

export function SectionSep({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-[#E0E0E0]" />
      <span className="font-montserrat text-[0.6rem] font-extrabold tracking-[0.16em] uppercase text-[#666] whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-[#E0E0E0]" />
    </div>
  );
}
