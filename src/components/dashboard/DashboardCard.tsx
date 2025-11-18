interface DashboardCardProps {
  title: string;
  value: string | number;
  subText?: string;
}

export default function DashboardCard({
  title,
  value,
  subText,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-2">
      <div className="text-sm text-gray-500">{title}</div>

      <div className="text-2xl font-semibold">{value}</div>

      {subText && <div className="text-sm text-red-600">{subText}</div>}
    </div>
  );
}
