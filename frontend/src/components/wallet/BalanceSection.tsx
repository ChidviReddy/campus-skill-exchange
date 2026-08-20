import { Coins, TrendingUp, TrendingDown } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

const BalanceSection = () => {
  const { balance, totalEarned, totalSpent } = useWallet();

  return (
    <section className="grid gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
      {/* Current Balance */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 p-7 text-white shadow-sm">
        <p className="text-base font-medium text-violet-100">
          Current balance
        </p>

        <div className="mt-4 flex items-baseline gap-3">
          <h2 className="text-5xl font-semibold tracking-tight">
            {balance}
          </h2>

          <span className="text-2xl font-medium text-violet-100">
            credits
          </span>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5">
          <Coins size={18} />

          <span className="text-sm font-medium">
            1 credit ≈ 1 session hour
          </span>
        </div>
      </div>

      {/* Total Earned */}
      <div className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <TrendingUp
              size={22}
              className="text-green-700"
            />
          </div>

          <p className="text-lg leading-tight text-slate-600">
            Total
            <br />
            earned
          </p>
        </div>

        <p className="mt-5 text-4xl font-medium text-[#211653]">
          {totalEarned}
        </p>
      </div>

      {/* Total Spent */}
      <div className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
            <TrendingDown
              size={22}
              className="text-red-600"
            />
          </div>

          <p className="text-lg leading-tight text-slate-600">
            Total spent
          </p>
        </div>

        <p className="mt-5 text-4xl font-medium text-[#211653]">
          {totalSpent}
        </p>
      </div>
    </section>
  );
};

export default BalanceSection;