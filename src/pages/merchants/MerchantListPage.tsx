import { useState } from "react";
import MerchantTable from "../../components/merchants/MerchantTable";
import SearchInput from "../../components/search/SearchInput";
import { useMerchants } from "../../hooks/useMerchants";

export default function MerchantListPage() {
  const [search, setSearch] = useState("");
  const { data, loading } = useMerchants(search);

  if (loading) return <div className="p-6 text-center">loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold">가맹점 리스트</h1>

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="가맹점 검색"
        />
      </div>

      <div className="overflow-x-auto bg-white p-6 rounded-xl border border-gray-200 text-xs sm:text-sm">
        <MerchantTable data={data} />
      </div>
    </div>
  );
}
