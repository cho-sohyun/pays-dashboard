import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useDashboardChart } from "../../hooks/useDashboardChart";

export default function Chart() {
  const { chartData, loading } = useDashboardChart();

  if (loading) return <div className="text-center py-10">loading...</div>;

  return (
    <div className="mt-8 w-full bg-white p-10 rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">기간별 매출</h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
            tabIndex={-1}
            style={{ outline: "none" }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              formatter={(value: number) => `${value.toLocaleString()}원`}
              labelStyle={{ fontSize: 12 }}
              contentStyle={{ fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#4F46E5"
              strokeWidth={1}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
