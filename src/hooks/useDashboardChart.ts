import { useEffect, useState } from "react";
import { getPaymentsList } from "../api/payments";
import type { Payment } from "../types/payments";

interface ChartData {
  date: string;
  amount: number;
}

export function useDashboardChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      setLoading(true);

      const res = await getPaymentsList();
      const payments: Payment[] = res.data ?? [];

      // 날짜별 합산
      const grouped: Record<string, number> = {};

      payments.forEach((p) => {
        const date = new Date(p.paymentAt);
        const key = `${date.getMonth() + 1}/${date.getDate()}`;

        const amount = Number(p.amount);

        if (!grouped[key]) grouped[key] = 0;
        grouped[key] += amount;
      });

      // grouped 객체를 배열 형태로 변환
      const result: ChartData[] = Object.entries(grouped).map(
        ([date, amount]) => ({
          date,
          amount,
        })
      );

      // 날짜순 정렬
      result.sort((a, b) => {
        const aa = Number(a.date.split("/")[1]);
        const bb = Number(b.date.split("/")[1]);
        return aa - bb;
      });

      setChartData(result);
    } finally {
      setLoading(false);
    }
  };

  return { chartData, loading };
}
