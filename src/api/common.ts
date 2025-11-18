import api from "./client";
import type {
  ApiResponse,
  PaymentStatusCode,
  PaymentTypeCode,
  MerchantStatusCode,
} from "../types/common";

// 결제 상태 코드
export const getPaymentStatusCodes = async () => {
  const response = await api.get<ApiResponse<PaymentStatusCode[]>>(
    "/common/payment-status/all"
  );
  return response.data.data;
};

// 결제 수단 코드
export const getPaymentTypeCodes = async () => {
  const response = await api.get<ApiResponse<PaymentTypeCode[]>>(
    "/common/paymet-type/all"
  );
  return response.data.data;
};

// 가맹점 상태 코드
export const getMerchantStatusCodes = async () => {
  const response = await api.get<ApiResponse<MerchantStatusCode[]>>(
    "/common/mcht-status/all"
  );
  return response.data.data;
};
