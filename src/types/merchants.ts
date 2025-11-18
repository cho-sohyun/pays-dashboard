export interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: "ACTIVE" | "INACTIVE" | "READY" | "CLOSED";
  bizType: string;
}

export interface MerchantResponse {
  status: number;
  message: string;
  data: Merchant[];
}

export interface MerchantDetail {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}

// 가맹점 상세 응답 타입
export interface MerchantDetailListResponse {
  status: number;
  message: string;
  data: MerchantDetail[];
}

// 가맹점 코드로 상세 조회 단일 객체 응답 타입
export interface MerchantDetailResponse {
  status: number;
  message: string;
  data: MerchantDetail;
}

export interface MerchantQueryParams {
  status?: string;
  bizType?: string;
  search?: string;
  page?: number;
  size?: number;
}
