import { useEffect, useState } from "react";
import { getMerchantsDetail } from "../api/merchants";
import type { MerchantDetail } from "../types/merchants";

export function useMerchants(search: string) {
  const [data, setData] = useState<MerchantDetail[]>([]);
  const [filtered, setFiltered] = useState<MerchantDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await getMerchantsDetail();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      data.filter(
        (m) =>
          m.mchtCode.toLowerCase().includes(q) ||
          m.mchtName.toLowerCase().includes(q) ||
          m.bizNo.includes(q) ||
          m.address.includes(q)
      )
    );
  }, [search, data]);
  return { data: filtered, loading };
}
