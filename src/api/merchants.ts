import api from "./client";
import type {
  Merchant,
  MerchantResponse,
  MerchantQueryParams,
  MerchantDetail,
  MerchantDetailListResponse,
} from "../types/merchants";

// 가맹점 목록 조회
export const getMerchantsList = async (
  params?: MerchantQueryParams
): Promise<MerchantResponse> => {
  const response = await api.get("/merchants/list", { params });
  return response.data;
};

// 가맹점 상세 조회
export const getMerchantsDetail = async (params?: {
  mchtCode?: string;
}): Promise<MerchantDetail[]> => {
  const response = await await api.get<MerchantDetailListResponse>(
    "/metchants/details",
    { params }
  );
  return response.data.data;
};

// 가맹점 상세 (path param)
export const getMerchantsByCode = async (
  mchtCode: string
): Promise<Merchant> => {
  const response = await api.get(`/merchants/${mchtCode}`);
  return response.data;
};
