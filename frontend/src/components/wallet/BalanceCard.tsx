import {
  Wallet,
  TrendingUp,
  Award,
  ShoppingCart,
} from "lucide-react";

const BalanceCard = () => {
  const usedCredits = 200;
  const totalCredits = 320;
  const percentage = (usedCredits / totalCredits) * 100;

  return (
    <section className="grid gap-6 lg:grid-cols-3">

      {/* Current Balance */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-purple-600 p-8 text-white shadow-lg lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-violet-100">
              Current Balance
            </p>

            <h2 className="mt-3 text-5xl font-bold">
              120 Credits
            </h2>

            <p className="mt-3 text-violet-100">
              Use your credits to book mentorship sessions and unlock premium learning opportunities.
            </p>
          </div>

          <div className="rounded-3xl bg-white/20 p-5">
            <Wallet size={42} />
          </div>
        </div>

        <button className="cursor-pointer mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 transition-all hover:scale-105">
          <ShoppingCart size={20} />
          Buy Credits
        </button>
      </div>

      {/* Credit Insights */}
      <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">
          <Award className="text-violet-600" />
          <h3 className="text-xl font-bold text-slate-900">
            Credit Insights
          </h3>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Credits Used</span>
            <span>{usedCredits}/{totalCredits}</span>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-violet-600"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="mt-6 flex items-center gap-2 text-green-600">
            <TrendingUp size={18} />

            <span className="font-medium">
              You're actively investing in your learning journey.
            </span>
          </div>

          <div className="mt-6 rounded-2xl bg-violet-50 p-4">
            <p className="text-sm text-slate-700">
              💡 <strong>Tip:</strong> Earn additional credits by mentoring other students,
              referring friends, or participating in community events.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default BalanceCard;