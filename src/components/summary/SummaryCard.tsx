interface SummaryCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function SummaryCardProps({
  title,
  value,
  color,
}: SummaryCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col gap-2">
      <span className="text-sm text-gray-600">{title}</span>
      <span className={`text-xl font-semibold ${color ?? "text-gray-800"}`}>
        {value}
      </span>
    </div>
  );
}
