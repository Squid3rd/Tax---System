"use client";

interface TaxRecord {
  id: number;
  country: string;
  gross_income: number;
  net_income: number;
  tax_amount: number;
  effective_rate: number;
  year: number;
  created_at: string;
}

interface Props {
  records: TaxRecord[];
}

export default function TaxHistory({ records }: Props) {
  const formatMoney = (n: number) =>
    n.toLocaleString("th-TH", { minimumFractionDigits: 2 });

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">ประวัติการคำนวณ</h2>
        <p className="text-gray-500">ยังไม่มีประวัติการคำนวณ</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">ประวัติการคำนวณ</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-2">วันที่</th>
              <th className="text-left p-2">ปีภาษี</th>
              <th className="text-right p-2">รายได้รวม</th>
              <th className="text-right p-2">รายได้สุทธิ</th>
              <th className="text-right p-2">ภาษี</th>
              <th className="text-right p-2">อัตรา</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  {new Date(r.created_at).toLocaleDateString("th-TH")}
                </td>
                <td className="p-2">{r.year}</td>
                <td className="p-2 text-right">{formatMoney(r.gross_income)}</td>
                <td className="p-2 text-right">{formatMoney(r.net_income)}</td>
                <td className="p-2 text-right font-medium text-blue-700">
                  {formatMoney(r.tax_amount)}
                </td>
                <td className="p-2 text-right">{r.effective_rate.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
