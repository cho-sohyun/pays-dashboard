import {
  useRecentPayments,
  type PaymentWithMerchant,
} from "../../hooks/useRecentPayments";
import formatDate from "../../utils/formatDate";
import Table from "../table/Table";
import type { Column } from "../table/Table";

export default function RecentPaymentsTable() {
  const { data, loading } = useRecentPayments();

  if (loading) return <div className="text-center py-6">loading...</div>;

  const columns: Column<PaymentWithMerchant>[] = [
    { key: "paymentCode", label: "거래번호" },
    { key: "merchantName", label: "가맹점" },
    { key: "payType", label: "결제수단" },
    {
      key: "amount",
      label: "금액",
      render: (val) => Number(val).toLocaleString() + "원",
    },
    {
      key: "status",
      label: "상태",
      render: (val) => {
        const color =
          val === "SUCCESS"
            ? "text-green-600"
            : val === "PENDING"
            ? "text-gray-800"
            : "text-red-600";

        return <span className={`text-sm font-medium ${color}`}>{val}</span>;
      },
    },
    {
      key: "paymentAt",
      label: "시간",
      render: (val) => formatDate(val),
    },
  ];

  const sortedData = [...data]
    .sort(
      (a, b) =>
        new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime()
    )
    .slice(0, 8);
  return (
    <div className="mt-10 bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        최근 거래 내역
      </h2>

      <div className="overflow-x-auto">
        <Table columns={columns} data={sortedData} />
      </div>
    </div>
  );
}
