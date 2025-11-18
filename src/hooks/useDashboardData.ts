import { useEffect, useState } from "react";
import { getPaymentsList } from "../api/payments";
import type { Payment } from "../types/payments";

export function useDashboardData() {
  const [loading, setLoading] = useState(false);

  const [totalAmount, setTotalAmount] = useState("0원");
  const [totalCount, setTotalCount] = useState(0);

  const [netRevenue, setNetRevenue] = useState("0원");

  const [cancelAmount, setCancelAmount] = useState("0원");
  const [cancelCount, setCancelCount] = useState(0);

  const [successRate, setSuccessRate] = useState("0%");
  const [cancelRate, setCancelRate] = useState("0%");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      const paymentResponse = await getPaymentsList();
      const paymentList: Payment[] = paymentResponse.data;

      // 총매출
      const total = paymentList.reduce(
        (acc, item) => acc + Number(item.amount),
        0
      );
      setTotalAmount(total.toLocaleString("ko-KR") + "원");
      setTotalCount(paymentList.length);

      // 실매출
      const successList = paymentList.filter((p) => p.status === "SUCCESS");
      const net = successList.reduce(
        (acc, item) => acc + Number(item.amount),
        0
      );
      setNetRevenue(net.toLocaleString("ko-KR") + "원");

      // 취소 + 실패
      const cancelList = paymentList.filter((p) =>
        ["FAILED", "CANCELLED", "PENDING"].includes(p.status)
      );
      const cancelTotal = cancelList.reduce(
        (acc, item) => acc + Number(item.amount),
        0
      );
      setCancelAmount(cancelTotal.toLocaleString("ko-KR") + "원");
      setCancelCount(cancelList.length);

      // 승인율
      const rate =
        paymentList.length === 0
          ? "0%"
          : ((successList.length / paymentList.length) * 100).toFixed(1) + "%";
      setSuccessRate(rate);

      // 취소율
      const cancelRateValue =
        paymentList.length === 0
          ? "0%"
          : ((cancelList.length / paymentList.length) * 100).toFixed(1) + "%";
      setCancelRate(cancelRateValue);
    } catch (err) {
      console.error("Dashboard API error", err);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    totalAmount,
    totalCount,
    netRevenue,
    cancelAmount,
    cancelCount,
    successRate,
    cancelRate,
  };
}
