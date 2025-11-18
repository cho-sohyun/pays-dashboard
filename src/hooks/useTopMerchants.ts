import { useEffect, useState } from "react";
import { getPaymentsList } from "../api/payments";
import { getMerchantsList } from "../api/merchants";
import type { Payment } from "../types/payments";
import type { Merchant } from "../types/merchants";

export function useTopMerchants() {
  const [loading, setLoading] = useState(false);
  const [topMerchants, setTopMerchants] = useState<
    { mchtCode: string; mchtName: string; totalAmount: number }[]
  >([]);

  useEffect(() => {
    loadTopMerchants();
  }, []);

  const loadTopMerchants = async () => {
    setLoading(true);

    try {
      const paymentResponse = await getPaymentsList();
      const payments: Payment[] = paymentResponse.data;

      const merchantResponse = await getMerchantsList();
      const merchantList: Merchant[] = merchantResponse.data;

      // 가맹점별 합산용 map
      const map: Record<string, number> = {};

      payments.forEach((p) => {
        const amount = Number(p.amount);

        if (!map[p.mchtCode]) {
          map[p.mchtCode] = 0;
        }
        map[p.mchtCode] += amount;
      });

      // 객체 상태 배열로 변환 + 이름 매핑
      const merged = Object.entries(map).map(([mchtCode, totalAmount]) => {
        const merchant = merchantList.find((m) => m.mchtCode === mchtCode);
        return {
          mchtCode,
          totalAmount,
          mchtName: merchant?.mchtName ?? "Unknown",
        };
      });

      // 거래액 정렬
      const top5 = merged
        .sort((a, b) => b.totalAmount - a.totalAmount)
        .slice(0, 5);

      setTopMerchants(top5);
    } catch (err) {
      console.log("Top merchants error", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, topMerchants };
}
