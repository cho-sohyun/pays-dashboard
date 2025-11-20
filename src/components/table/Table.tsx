export interface Column<T> {
  key: keyof T;
  label: string | React.ReactNode;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function Table<T extends object>({
  columns,
  data,
}: TableProps<T>) {
  return (
    <table className="w-full border-collapse text-center text-gray-700">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-100 text-gray-700">
          {columns.map((col) => (
            <th key={String(col.key)} className="p-3">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className="border-b border-gray-200 hover:bg-gray-100 transition"
          >
            {columns.map((col) => {
              const value = row[col.key];
              return (
                <td
                  key={String(col.key)}
                  className="p-3 relative overflow-visible"
                >
                  {col.render ? col.render(value, row) : String(value)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
