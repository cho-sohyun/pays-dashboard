import { useEffect, useRef } from "react";

interface Props {
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function TableFilterDropdown({
  options,
  selected,
  onChange,
  onClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-7 bg-white border border-gray-300 rounded-md w-48 z-20 p-3 max-h-60 overflow-y-auto"
    >
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2 text-sm py-1 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onChange(opt)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}
