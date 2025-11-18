import api from "./client";
import type { PaymentResponse, PaymentQueryParams } from "../types/payments";

// 전체 거래 내역 조회
export const getPaymentsList = async (
  params?: PaymentQueryParams
): Promise<PaymentResponse> => {
  const response = await api.get("/payments/list", { params });
  return response.data;
};
