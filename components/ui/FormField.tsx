import clsx from "clsx";

interface FormFieldProps {
  label: string;
  hint?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, hint, fullWidth, children, className }: FormFieldProps) {
  return (
    <div className={clsx("mb-3", fullWidth && "col-span-2", className)}>
      <label className="block font-montserrat text-[0.6rem] font-bold tracking-widest uppercase text-[#666] mb-1">
        {label}
      </label>
      {children}
      {hint && <p className="text-[0.68rem] text-[#666] mt-1">{hint}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full px-3 py-[0.7rem] border-[1.5px] border-[#E0E0E0] rounded font-opensans text-[0.86rem] text-[#1A1A1A] outline-none transition-colors focus:border-[#F5921E] bg-white",
        className
      )}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={clsx(
        "w-full px-3 py-[0.7rem] border-[1.5px] border-[#E0E0E0] rounded font-opensans text-[0.86rem] text-[#1A1A1A] outline-none transition-colors focus:border-[#F5921E] bg-white resize-y min-h-[86px] leading-relaxed",
        className
      )}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}
export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={clsx(
        "w-full px-3 py-[0.7rem] border-[1.5px] border-[#E0E0E0] rounded font-opensans text-[0.86rem] text-[#1A1A1A] outline-none transition-colors focus:border-[#F5921E] bg-white appearance-none",
        className
      )}
    >
      {children}
    </select>
  );
}
