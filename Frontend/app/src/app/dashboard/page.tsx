"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTaxHistory, isLoggedIn } from "@/lib/api";
import TaxCalculator from "@/components/TaxCalculator";
import TaxHistory from "@/components/TaxHistory";

export default function DashboardPage() {
  const router = useRouter();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getTaxHistory();
      setRecords(data.records || []);
    } catch {
      // token หมดอายุ → redirect ไป login
      router.push("/login");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <TaxCalculator onCalculated={fetchHistory} />
        <TaxHistory records={records} />
      </div>
    </div>
  );
}
