import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
} from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

type FilterType = "all" | "earned" | "spent";

const TransactionHistory = () => {
  const { transactions } = useWallet();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "earned") return t.amount > 0;
    if (filter === "spent") return t.amount < 0;
    return true;
  });

  return (
    <section>
      {/* Header & Filter Tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-medium text-[#211653]">
          Transaction history
        </h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`cursor-pointer rounded-full px-7 py-2.5 text-sm font-medium transition ${
              filter === "all"
                ? "bg-violet-600 text-white shadow-sm"
                : "border border-violet-200 bg-white text-[#33227a] hover:bg-violet-50"
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilter("earned")}
            className={`cursor-pointer rounded-full px-7 py-2.5 text-sm font-medium transition ${
              filter === "earned"
                ? "bg-violet-600 text-white shadow-sm"
                : "border border-violet-200 bg-white text-[#33227a] hover:bg-violet-50"
            }`}
          >
            Earned
          </button>

          <button
            type="button"
            onClick={() => setFilter("spent")}
            className={`cursor-pointer rounded-full px-7 py-2.5 text-sm font-medium transition ${
              filter === "spent"
                ? "bg-violet-600 text-white shadow-sm"
                : "border border-violet-200 bg-white text-[#33227a] hover:bg-violet-50"
            }`}
          >
            Spent
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <Receipt size={28} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              No transactions found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              There are no {filter !== "all" ? filter : ""} credit transactions recorded yet.
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction, index) => {
            const isSpent = transaction.amount < 0;

            return (
              <div
                key={transaction.id || `${transaction.description}-${index}`}
                className={`flex items-center justify-between gap-5 px-7 py-6 ${
                  index !== filteredTransactions.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                {/* Left */}
                <div className="flex min-w-0 items-center gap-5">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                      isSpent ? "bg-red-100" : "bg-green-100"
                    }`}
                  >
                    {isSpent ? (
                      <ArrowUpRight
                        size={22}
                        className="text-red-600"
                      />
                    ) : (
                      <ArrowDownLeft
                        size={22}
                        className="text-green-700"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-medium text-[#211653]">
                      {transaction.description}
                    </h3>

                    <p className="mt-1 text-base text-slate-500">
                      {transaction.date}

                      {transaction.participantName && (
                        <>
                          {" "}
                          · {transaction.participantName}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Credits Amount */}
                <p
                  className={`shrink-0 text-xl font-semibold ${
                    isSpent
                      ? "text-red-600"
                      : "text-green-700"
                  }`}
                >
                  {isSpent ? "-" : "+"}
                  {Math.abs(transaction.amount)} Credits
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default TransactionHistory;