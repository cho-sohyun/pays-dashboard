import DashboardCard from "../../components/dashboard/DashboardCard";
import Chart from "../../components/dashboard/Chart";
import { useDashboardData } from "../../hooks/useDashboardData";
import RecentPaymentsTable from "../../components/dashboard/RecentPaymentsTable";

export default function DashboardPage() {
  const {
    loading,
    totalAmount,
    totalCount,
    netRevenue,
    cancelCount,
    cancelAmount,
    successRate,
    cancelRate,
  } = useDashboardData();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">대시보드</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-6">
        <DashboardCard
          title="총매출"
          value={loading ? "로딩중..." : totalAmount}
          subText={`전체 거래 ${totalCount}건`}
        />
        <DashboardCard
          title="실매출"
          value={loading ? "로딩중..." : netRevenue}
          subText={`취소 ${cancelCount}건 / ${cancelAmount}`}
        />
        <DashboardCard
          title="승인율"
          value={loading ? "로딩중..." : successRate}
          subText={`취소율 ${cancelRate}`}
        />
        <DashboardCard
          title="활성 가맹점"
          value="나중에 연동"
          subText="비활성 0곳"
        />
      </div>

      {/* chart */}
      <Chart />
      <RecentPaymentsTable />
    </div>
  );
}
