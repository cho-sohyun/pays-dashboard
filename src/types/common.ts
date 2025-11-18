export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// 결제 상태 코드
export interface PaymentStatusCode {
  code: string;
  description: string;
}

// 결제 수단 코드
export interface PaymentTypeCode {
  type: string;
  description: string;
}

// 가맹점 상태 코드
export interface MerchantStatusCode {
  code: string;
  description: string;
}
