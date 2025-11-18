import { useState, useEffect } from "react";
import { getMerchantsList } from "../api/merchants";
import type { Merchant } from "../types/merchants";

export function useMerchantData() {
  const [loading, setLoading] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    loadMerchantData();
  }, []);

  const loadMerchantData = async () => {
    setLoading(true);
    try {
      const response = await getMerchantsList();
      const merchants: Merchant[] = response.data;

      // ACTIVE 가맹점 수
      const active = merchants.filter((m) => m.status === "ACTIVE").length;
      setActiveCount(active);

      // 비활성(INACTIVE, READY, CLOSED)
      const inactive = merchants.filter((m) =>
        ["INACTIVE", "READY", "CLOSED"].includes(m.status)
      ).length;
      setInactiveCount(inactive);
    } catch (err) {
      console.error("Merchant API Error", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, activeCount, inactiveCount };
}
