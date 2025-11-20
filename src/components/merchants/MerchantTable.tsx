import type { MerchantDetail } from "../../types/merchants";
import formatDate from "../../utils/formatDate";
import Table from "../table/Table";
import type { Column } from "../table/Table";

export default function MerchantTable({ data }: { data: MerchantDetail[] }) {
  const columns: Column<MerchantDetail>[] = [
    { key: "mchtCode", label: "가맹점 코드" },
    { key: "mchtName", label: "가맹점명" },
    { key: "status", label: "상태" },
    { key: "bizType", label: "업종" },
    { key: "bizNo", label: "사업자번호" },
    { key: "address", label: "주소" },
    { key: "phone", label: "연락처" },
    { key: "email", label: "이메일" },

    {
      key: "registeredAt",
      label: "등록일",
      render: (v) => formatDate(v),
    },
    {
      key: "updatedAt",
      label: "수정일",
      render: (v) => formatDate(v),
    },
  ];
  return (
    <div className="text-xs">
      <Table columns={columns} data={data} />
    </div>
  );
}
