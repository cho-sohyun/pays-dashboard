import { useState } from "react";
import FilterIcon from "../../components/filters/FilterIcon";
import TableFilterDropdown from "../../components/table/TableFilterDropdown";
import { useRecentPayments } from "../../hooks/useRecentPayments";
import type { PaymentWithMerchant } from "../../hooks/useRecentPayments";
import { useTransactionFilter } from "../../hooks/useTransactionFilter";
import { calculatePaymentSummary } from "../../utils/calculatePaymentSummary";
import SummaryCard from "../../components/summary/SummaryCard";
import Table from "../../components/table/Table";
import type { Column } from "../../components/table/Table";
import formatDate from "../../utils/formatDate";

export default function TransactionListPage() {
  const { data, loading } = useRecentPayments();
  const { filteredData, filters, toggle } = useTransactionFilter(data);

  const summary = calculatePaymentSummary(filteredData);

  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const toggleOpen = (key: string) => {
    setOpenFilter((prev) => (prev === key ? null : key));
  };

  const columns: Column<PaymentWithMerchant>[] = [
    {
      key: "paymentDate",
      label: (
        <div className="relative flex items-center justify-center">
          일자
          <span onClick={() => toggleOpen("date")}>
            <FilterIcon />
          </span>
          {openFilter === "date" && (
            <TableFilterDropdown
              options={[...new Set(data.map((d) => d.paymentAt.slice(0, 10)))]}
              selected={filters.dates}
              onChange={(v) => toggle("dates", v)}
              onClose={() => setOpenFilter(null)}
            />
          )}
        </div>
      ),
      render: (_, row) => row.paymentAt.slice(0, 10),
    },

    {
      key: "mchtCode",
      label: (
        <div className="relative flex items-center justify-center">
          가맹코드
          <span onClick={() => toggleOpen("merchant")}>
            <FilterIcon />
          </span>
          {openFilter === "merchant" && (
            <TableFilterDropdown
              options={[...new Set(data.map((d) => d.mchtCode))]}
              selected={filters.merchants}
              onChange={(v) => toggle("merchants", v)}
              onClose={() => setOpenFilter(null)}
            />
          )}
        </div>
      ),
    },

    {
      key: "merchantName",
      label: (
        <div className="relative flex items-center justify-center">
          가맹점명
          <span onClick={() => toggleOpen("merchantName")}>
            <FilterIcon />
          </span>
          {openFilter === "merchantName" && (
            <TableFilterDropdown
              options={[...new Set(data.map((d) => d.merchantName))]}
              selected={filters.merchants}
              onChange={(v) => toggle("merchants", v)}
              onClose={() => setOpenFilter(null)}
            />
          )}
        </div>
      ),
    },

    {
      key: "amount",
      label: "금액",
      render: (v) => Number(v).toLocaleString() + "원",
    },

    {
      key: "payType",
      label: (
        <div className="relative flex items-center justify-center">
          결제수단
          <span onClick={() => toggleOpen("payType")}>
            <FilterIcon />
          </span>
          {openFilter === "payType" && (
            <TableFilterDropdown
              options={[...new Set(data.map((d) => d.payType))]}
              selected={filters.payTypes}
              onChange={(v) => toggle("payTypes", v)}
              onClose={() => setOpenFilter(null)}
            />
          )}
        </div>
      ),
    },

    {
      key: "status",
      label: (
        <div className="relative flex items-center justify-center">
          상태
          <span onClick={() => toggleOpen("status")}>
            <FilterIcon />
          </span>
          {openFilter === "status" && (
            <TableFilterDropdown
              options={[...new Set(data.map((d) => d.status))]}
              selected={filters.statuses}
              onChange={(v) => toggle("statuses", v)}
              onClose={() => setOpenFilter(null)}
            />
          )}
        </div>
      ),
    },

    {
      key: "paymentAt",
      label: "일시",
      render: (v) => formatDate(v),
    },
  ];

  if (loading) return <div className="p-6 text-center">loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">거래 내역 조회</h1>

      {/* 요약 영역 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="총매출"
          value={summary.totalAmount.toLocaleString() + "원"}
        />
        <SummaryCard
          title="실매출"
          value={summary.netRevenue.toLocaleString() + "원"}
          color="text-blue-600"
        />
        <SummaryCard title="승인건수" value={summary.successCount} />
        <SummaryCard
          title="취소건수"
          value={summary.cancelCount}
          color="text-red-600"
        />
      </div>

      {/* 테이블 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <Table columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
