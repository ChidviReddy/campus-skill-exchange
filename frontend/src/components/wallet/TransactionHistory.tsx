import {
  ArrowDownLeft,
  ArrowUpRight,
  Gift,
} from "lucide-react";

type Transaction = {
  type: "earned" | "spent" | "bonus";
  title: string;
  date: string;
  participant?: string;
  credits: number;
};

const transactions: Transaction[] = [
  {
    type: "earned",
    title: "Teaching reward — React basics",
    date: "Today, 5:40 PM",
    participant: "with Priya S.",
    credits: 10,
  },
  {
    type: "spent",
    title: "Learning deduction — UI/UX fundamentals",
    date: "Yesterday, 11:20 AM",
    participant: "with Arjun M.",
    credits: 5,
  },
  {
    type: "earned",
    title: "Teaching reward — DSA doubt session",
    date: "2 days ago",
    participant: "with Sneha R.",
    credits: 10,
  },
  {
    type: "spent",
    title: "Learning deduction — Machine Learning intro",
    date: "4 days ago",
    participant: "with Karthik V.",
    credits: 5,
  },
  {
    type: "bonus",
    title: "Welcome bonus",
    date: "12 days ago",
    participant: "Joined SkillSwap",
    credits: 10,
  },
];

const TransactionHistory = () => {
  return (
    <section>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-medium text-[#211653]">
          Transaction history
        </h2>

        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer rounded-full bg-violet-600 px-7 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            All
          </button>

          <button
            className="cursor-pointer rounded-full border border-violet-200 bg-white px-7 py-2.5 text-sm font-medium text-[#33227a] transition hover:bg-violet-50"
          >
            Earned
          </button>

          <button
            className="cursor-pointer rounded-full border border-violet-200 bg-white px-7 py-2.5 text-sm font-medium text-[#33227a] transition hover:bg-violet-50"
          >
            Spent
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
        {transactions.map((transaction, index) => {
          const isSpent = transaction.type === "spent";
          const isBonus = transaction.type === "bonus";

          return (
            <div
              key={`${transaction.title}-${index}`}
              className={`flex items-center justify-between gap-5 px-7 py-6 ${
                index !== transactions.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              {/* Left */}
              <div className="flex min-w-0 items-center gap-5">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                    isSpent
                      ? "bg-red-100"
                      : isBonus
                        ? "bg-violet-100"
                        : "bg-green-100"
                  }`}
                >
                  {isSpent ? (
                    <ArrowUpRight
                      size={22}
                      className="text-red-600"
                    />
                  ) : isBonus ? (
                    <Gift
                      size={22}
                      className="text-violet-600"
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
                    {transaction.title}
                  </h3>

                  <p className="mt-1 text-base text-slate-500">
                    {transaction.date}

                    {transaction.participant && (
                      <>
                        {" "}
                        · {transaction.participant}
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Credits */}
              <p
                className={`shrink-0 text-xl font-semibold ${
                  isSpent
                    ? "text-red-600"
                    : "text-green-700"
                }`}
              >
                {isSpent ? "-" : "+"}
                {transaction.credits}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TransactionHistory;