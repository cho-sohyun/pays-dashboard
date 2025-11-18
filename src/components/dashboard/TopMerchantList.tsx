interface Props {
  loading: boolean;
  list: { mchtCode: string; mchtName: string; totalAmount: number }[];
}

export default function TopMerchantList({ loading, list }: Props) {
  if (loading) return <div className="mt-8">loading...</div>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-11 mt-8">
      <h2 className="text-xl font-semibold mb-4">가맹점 TOP 5 (거래액 기준)</h2>

      <ul className="flex flex-col gap-3">
        {list.map((item, i) => (
          <li
            key={item.mchtCode}
            className="flex justify-between border-b border-gray-200 pb-2"
          >
            <div>
              <span className="font-medium">
                {i + 1}. {item.mchtName}
              </span>
              <div className="text-sm text-gray-400">{item.mchtCode}</div>
            </div>

            <div className="font-semibold">
              {item.totalAmount.toLocaleString("ko-KR")}원
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
