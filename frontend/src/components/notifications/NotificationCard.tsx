import {
  CalendarDays,
  CheckCircle2,
  Coins,
  MessageSquare,
  UserX,
} from "lucide-react";

type NotificationType =
  | "session"
  | "request"
  | "review"
  | "wallet"
  | "declined";

type NotificationCardProps = {
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

const notificationConfig = {
  session: {
    icon: CalendarDays,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    button: "Join Session",
  },
  request: {
    icon: CheckCircle2,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    button: "View Session",
  },
  review: {
    icon: MessageSquare,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    button: "Leave Review",
  },
  wallet: {
    icon: Coins,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    button: "View Wallet",
  },
  declined: {
    icon: UserX,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    button: "Find Mentor",
  },
};

const NotificationCard = ({
  type,
  title,
  description,
  time,
  unread = false,
}: NotificationCardProps) => {
  const config = notificationConfig[type];
  const Icon = config.icon;

  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          <div className={`rounded-2xl p-4 ${config.iconBg}`}>
            <Icon size={28} className={config.iconColor} />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-slate-900">
                {title}
              </h3>

              {unread && (
                <span className="h-3 w-3 rounded-full bg-violet-600"></span>
              )}
            </div>

            <p className="mt-2 text-slate-600">
              {description}
            </p>

            <p className="mt-4 text-sm text-slate-400">
              {time}
            </p>
          </div>
        </div>

        <button className="cursor-pointer rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all hover:bg-violet-700">
          {config.button}
        </button>
      </div>
    </section>
  );
};

export default NotificationCard;