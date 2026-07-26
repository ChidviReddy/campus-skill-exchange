import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Receipt,
} from "lucide-react";

const WalletHeader = () => {
  return (
    <section>
      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-slate-900">
          Wallet & Credits
        </h1>

        <p className="text-lg text-slate-600">
          Manage your credits, monitor transactions, and track your learning expenses.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* Available Credits */}
        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Available Credits
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                120
              </h2>
            </div>

            <div className="rounded-2xl bg-violet-100 p-4">
              <Wallet className="text-violet-600" size={28} />
            </div>
          </div>
        </div>

        {/* Credits Earned */}
        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Credits Earned
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                320
              </h2>
            </div>

            <div className="rounded-2xl bg-green-100 p-4">
              <TrendingUp className="text-green-600" size={28} />
            </div>
          </div>
        </div>

        {/* Credits Spent */}
        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Credits Spent
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                200
              </h2>
            </div>

            <div className="rounded-2xl bg-red-100 p-4">
              <TrendingDown className="text-red-600" size={28} />
            </div>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Transactions
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                42
              </h2>
            </div>

            <div className="rounded-2xl bg-blue-100 p-4">
              <Receipt className="text-blue-600" size={28} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WalletHeader;