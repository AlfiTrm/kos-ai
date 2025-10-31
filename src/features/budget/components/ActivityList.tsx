import React from "react";
import { formatRupiah } from "@/libs/format";
import type { Txn } from "@/libs/store";

interface ActivityListProps {
  transactions: Txn[];
  limit?: number;
}

export default function ActivityList({
  transactions,
  limit = 5,
}: ActivityListProps) {
  const displayTransactions = transactions.slice(0, limit);

  return (
    <section className="px-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base font-semibold">Detail Activity</h2>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-sm text-purple-1"
        >
          See All
        </a>
      </div>
      {displayTransactions.length === 0 ? (
        <div className="text-center text-sm text-neutral-500 mt-6 bg-white/60 p-4 rounded-xl">
          Belum ada aktivitas. Yuk, catat transaksi pertamamu!
        </div>
      ) : (
        <div className="space-y-2">
          {displayTransactions.map((txn) => (
            <div
              key={txn.id}
              className="flex justify-between items-center bg-white/80 backdrop-blur p-3 rounded-xl text-sm border border-white/40 shadow-sm"
            >
              <div>
                <p className="font-medium capitalize">
                  {txn.category || "Lainnya"}
                </p>
                <p className="text-[11px] text-neutral-500">
                  {new Date(txn.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
              <p
                className={`font-semibold ${
                  txn.amount < 0 ? "text-red-500" : "text-green-600"
                }`}
              >
                {formatRupiah(txn.amount)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
