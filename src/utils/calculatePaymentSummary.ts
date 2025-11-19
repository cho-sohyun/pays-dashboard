import type { Payment } from "../types/payments";

export function calculatePaymentSummary(list: Payment[]) {
  // 총매출
  const totalAmount = list.reduce((acc, p) => acc + Number(p.amount), 0);

  // 승인
  const successList = list.filter((p) => p.status === "SUCCESS");
  const netRevenue = successList.reduce((acc, p) => acc + Number(p.amount), 0);

  // 취소 실패 대기
  const cancelList = list.filter((p) =>
    ["FAILED", "CANCELLED", "PENDING"].includes(p.status)
  );

  return {
    totalAmount,
    netRevenue,
    successCount: successList.length,
    cancelCount: cancelList.length,
  };
}
