export interface Payment {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: string;
  status: string;
  paymentAt: string;
}

export interface PaymentResponse {
  status: number;
  message: string;
  data: Payment[];
}

export interface PaymentQueryParams {
  startDate?: string;
  endDate?: string;
  status?: string;
  payType?: string;
  mchtCode?: string;
  page?: number;
  size?: number;
}
