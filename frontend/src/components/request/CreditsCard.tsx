import { Coins, Wallet, Info } from "lucide-react";

const CreditsCard = () => {
  const sessionCost = 25;
  const availableCredits = 120;
  const remainingCredits = availableCredits - sessionCost;

  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
          <Coins
            size={22}
            className="text-violet-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Credits Summary
          </h2>

          <p className="text-sm text-slate-500">
            Review your credits before sending the request.
          </p>
        </div>
      </div>

      {/* Credit Details */}
      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            Session Cost
          </span>

          <span className="font-semibold text-slate-900">
            {sessionCost} Credits
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet
              size={18}
              className="text-violet-600"
            />

            <span className="text-slate-600">
              Available
            </span>
          </div>

          <span className="font-semibold text-green-600">
            {availableCredits} Credits
          </span>
        </div>

        <div className="border-t border-slate-200 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-700">
              Remaining After Booking
            </span>

            <span className="text-lg font-bold text-violet-700">
              {remainingCredits} Credits
            </span>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 rounded-2xl border border-violet-100 bg-violet-50 p-4">
        <div className="flex items-start gap-3">
          <Info
            size={18}
            className="mt-0.5 text-violet-600"
          />

          <p className="text-sm leading-6 text-slate-600">
            Credits will only be deducted after the mentor accepts your
            request. If your request is declined or expires, your credits
            remain unchanged.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CreditsCard;