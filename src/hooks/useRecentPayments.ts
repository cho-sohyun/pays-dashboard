import { useEffect, useState } from "react";
import { getPaymentsList } from "../api/payments";
import { getMerchantsList } from "../api/merchants";

import type { Payment } from "../types/payments";
import type { Merchant } from "../types/merchants";

export interface PaymentWithMerchant extends Payment {
  merchantName: string;
  paymentDate: string;
}

export function useRecentPayments() {
  const [data, setData] = useState<PaymentWithMerchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const [paymentsRes, merchantsRes] = await Promise.all([
          getPaymentsList(),
          getMerchantsList(),
        ]);

        const payments: Payment[] = paymentsRes.data;
        const merchants: Merchant[] = merchantsRes.data;

        // 가맹점 매핑
        const merchantMap = new Map(
          merchants.map((m: Merchant) => [m.mchtCode, m.mchtName])
        );

        // 결제 데이터 + 가맹점명 붙이기
        const formatted = payments.map(
          (p: Payment): PaymentWithMerchant => ({
            ...p,
            merchantName: merchantMap.get(p.mchtCode) ?? "미확인 가맹점",
            paymentDate: p.paymentAt.slice(0, 10),
          })
        );
        setData(formatted);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);
  return { data, loading };
}
