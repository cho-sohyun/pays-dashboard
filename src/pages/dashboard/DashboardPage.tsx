import DashboardCard from "../../components/dashboard/DashboardCard";
import Chart from "../../components/dashboard/Chart";
import { useDashboardData } from "../../hooks/useDashboardData";
import RecentPaymentsTable from "../../components/dashboard/RecentPaymentsTable";
import { useMerchantData } from "../../hooks/useMerchantData";
import { useTopMerchants } from "../../hooks/useTopMerchants";
import TopMerchantList from "../../components/dashboard/TopMerchantList";

export default function DashboardPage() {
  const {
    loading: paymentLoading,
    totalAmount,
    totalCount,
    netRevenue,
    cancelCount,
    cancelAmount,
    successRate,
    cancelRate,
  } = useDashboardData();

  const {
    loading: merchantLoading,
    activeCount,
    inactiveCount,
  } = useMerchantData();

  const { loading: topLoading, topMerchants } = useTopMerchants();

  const loading = paymentLoading || merchantLoading || topLoading;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">대시보드</h1>

      {/* 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-6">
        <DashboardCard
          title="총매출"
          value={loading ? "loading..." : totalAmount}
          subText={`전체 거래 ${totalCount}건`}
        />
        <DashboardCard
          title="실매출"
          value={loading ? "loading..." : netRevenue}
          subText={`취소 ${cancelCount}건 / ${cancelAmount}`}
        />
        <DashboardCard
          title="승인율"
          value={loading ? "loading..." : successRate}
          subText={`취소율 ${cancelRate}`}
        />
        <DashboardCard
          title="활성 가맹점"
          value={loading ? "loading..." : `${activeCount}곳`}
          subText={`비활성 ${inactiveCount}곳`}
        />
      </div>

      {/* 차트 */}
      <div className="grid gird-cols-1 xl:grid-cols-3 gap-4 mt-8">
        <div className="xl:col-span-2">
          <Chart />
        </div>

        <div>
          <TopMerchantList loading={topLoading} list={topMerchants} />
        </div>
      </div>

      {/* 최근 거래내역 */}
      <RecentPaymentsTable />
    </div>
  );
}
