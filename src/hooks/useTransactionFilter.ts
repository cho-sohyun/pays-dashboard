import { useState, useMemo } from "react";
import type { PaymentWithMerchant } from "./useRecentPayments";

export function useTransactionFilter(data: PaymentWithMerchant[]) {
  const [filters, setFilters] = useState({
    dates: [] as string[],
    merchants: [] as string[],
    payTypes: [] as string[],
    statuses: [] as string[],
  });

  const toggle = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      const updated = exists
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: updated };
    });
  };

  const filteredData = useMemo(() => {
    return data
      .filter((p) =>
        filters.dates.length === 0
          ? true
          : filters.dates.includes(p.paymentAt.slice(0, 10))
      )
      .filter((p) =>
        filters.merchants.length === 0
          ? true
          : filters.merchants.includes(p.mchtCode) ||
            filters.merchants.includes(p.merchantName)
      )
      .filter((p) =>
        filters.payTypes.length === 0
          ? true
          : filters.payTypes.includes(p.payType)
      )
      .filter((p) =>
        filters.statuses.length === 0
          ? true
          : filters.statuses.includes(p.status)
      );
  }, [filters, data]);
  return { filters, toggle, filteredData };
}
