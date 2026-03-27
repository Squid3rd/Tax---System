"use client";

import { useState } from "react";
import { calculateTax } from "@/lib/api";

interface TaxResult {
  gross_income: number;
  expense_deduction: number;
  personal_allowance: number;
  net_income: number;
  tax_amount: number;
  effective_rate: number;
}

interface Props {
  onCalculated: () => void; // callback เพื่อ refresh ประวัติ
}

export default function TaxCalculator({ onCalculated }: Props) {
  const [grossIncome, setGrossIncome] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [result, setResult] = useState<TaxResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await calculateTax(parseFloat(grossIncome), year, "TH");
      setResult(data.result);
      onCalculated(); // บอก parent ให้ refresh ประวัติ
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (n: number) =>
    n.toLocaleString("th-TH", { minimumFractionDigits: 2 });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">คำนวณภาษีเงินได้ (ไทย)</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            รายได้รวมทั้งปี (บาท)
          </label>
          <input
            type="number"
            value={grossIncome}
            onChange={(e) => setGrossIncome(e.target.value)}
            placeholder="เช่น 600000"
            className="w-full border rounded p-2"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">ปีภาษี</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "กำลังคำนวณ..." : "คำนวณภาษี"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mt-4">{error}</div>
      )}

      {result && (
        <div className="mt-6 border-t pt-4 space-y-2">
          <h3 className="font-bold text-lg">ผลการคำนวณ</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-gray-600">รายได้รวม:</span>
            <span className="text-right">
              {formatMoney(result.gross_income)} บาท
            </span>

            <span className="text-gray-600">หักค่าใช้จ่าย:</span>
            <span className="text-right text-red-600">
              -{formatMoney(result.expense_deduction)} บาท
            </span>

            <span className="text-gray-600">หักค่าลดหย่อนส่วนตัว:</span>
            <span className="text-right text-red-600">
              -{formatMoney(result.personal_allowance)} บาท
            </span>

            <span className="text-gray-600 font-medium">รายได้สุทธิ:</span>
            <span className="text-right font-medium">
              {formatMoney(result.net_income)} บาท
            </span>

            <span className="text-gray-600 font-bold text-base">
              ภาษีที่ต้องจ่าย:
            </span>
            <span className="text-right font-bold text-base text-blue-700">
              {formatMoney(result.tax_amount)} บาท
            </span>

            <span className="text-gray-600">อัตราภาษีที่แท้จริง:</span>
            <span className="text-right">
              {result.effective_rate.toFixed(2)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
