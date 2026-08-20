import { Coins, Wallet, Info, AlertTriangle } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

type CreditsCardProps = {
  cost?: number;
};

const CreditsCard = ({ cost = 5 }: CreditsCardProps) => {
  const { balance } = useWallet();
  const sessionCost = cost;
  const availableCredits = balance;
  const remainingCredits = Math.max(0, availableCredits - sessionCost);
  const isInsufficient = availableCredits < 5;

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

      {/* Insufficient Credits Warning */}
      {isInsufficient && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle size={20} className="shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              Insufficient credits
            </p>
            <p className="mt-0.5 text-xs text-amber-700">
              At least 5 credits are required to book this session. You currently have {availableCredits} credits.
            </p>
          </div>
        </div>
      )}

      {/* Credit Details */}
      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            Current Balance
          </span>

          <div className="flex items-center gap-2">
            <Wallet
              size={18}
              className="text-violet-600"
            />
            <span
              className={`font-semibold ${
                isInsufficient ? "text-red-600" : "text-slate-900"
              }`}
            >
              {availableCredits} Credits
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            Cost at Completion
          </span>

          <span className="font-semibold text-violet-700">
            {sessionCost} Credits
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600">
            Deduction Now
          </span>

          <span className="font-semibold text-green-600">
            0 Credits (Pending)
          </span>
        </div>

        <div className="border-t border-slate-200 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-700">
              Balance After Completion
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
            Credits will only be deducted after the session is completed. If your request is pending, accepted, cancelled, or declined, your credits remain unchanged.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CreditsCard;