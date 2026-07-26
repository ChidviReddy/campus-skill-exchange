import {
  ArrowDownLeft,
  ArrowUpRight,
  RotateCcw,
  ShoppingCart,
} from "lucide-react";

type TransactionType =
  | "earned"
  | "spent"
  | "refund"
  | "purchase";

type TransactionCardProps = {
  type: TransactionType;
  title: string;
  description: string;
  credits: number;
  date: string;
};

const transactionConfig = {
  earned: {
    icon: ArrowDownLeft,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    amountColor: "text-green-600",
    prefix: "+",
    label: "Earned",
  },
  spent: {
    icon: ArrowUpRight,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    amountColor: "text-red-600",
    prefix: "-",
    label: "Spent",
  },
  refund: {
    icon: RotateCcw,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    amountColor: "text-blue-600",
    prefix: "+",
    label: "Refund",
  },
  purchase: {
    icon: ShoppingCart,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    amountColor: "text-violet-600",
    prefix: "+",
    label: "Purchase",
  },
};

const TransactionCard = ({
  type,
  title,
  description,
  credits,
  date,
}: TransactionCardProps) => {
  const config = transactionConfig[type];
  const Icon = config.icon;

  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-start gap-5">

          <div className={`rounded-2xl p-4 ${config.iconBg}`}>
            <Icon size={28} className={config.iconColor} />
          </div>

          <div>
            <div className="flex items-center gap-3">

              <h3 className="text-xl font-semibold text-slate-900">
                {title}
              </h3>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {config.label}
              </span>

            </div>

            <p className="mt-2 text-slate-600">
              {description}
            </p>

            <p className="mt-3 text-sm text-slate-400">
              {date}
            </p>

          </div>

        </div>

        <div className="text-right">

          <p
            className={`text-3xl font-bold ${config.amountColor}`}
          >
            {config.prefix}
            {credits}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Credits
          </p>

        </div>

      </div>
    </section>
  );
};

export default TransactionCard;