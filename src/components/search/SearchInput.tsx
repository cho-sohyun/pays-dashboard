import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder }: Props) {
  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      <input
        className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
