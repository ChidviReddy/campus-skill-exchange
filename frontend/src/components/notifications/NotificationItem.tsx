import {
  Bell,
  Star,
  Coins,
  MessageCircle,
  XCircle,
  CalendarClock,
  Clock3,
} from "lucide-react";

type NotificationType =
  | "request"
  | "review"
  | "credit"
  | "chat"
  | "rejected"
  | "session"
  | "reminder";

type NotificationItemProps = {
  type: NotificationType;
  title: string;
  time: string;
  unread?: boolean;
  isLast?: boolean;
};

const notificationConfig = {
  request: {
    icon: Bell,
    background: "bg-violet-100",
    iconColor: "text-violet-700",
  },

  review: {
    icon: Star,
    background: "bg-amber-100",
    iconColor: "text-amber-600",
  },

  credit: {
    icon: Coins,
    background: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },

  chat: {
    icon: MessageCircle,
    background: "bg-violet-100",
    iconColor: "text-violet-700",
  },

  rejected: {
    icon: XCircle,
    background: "bg-red-100",
    iconColor: "text-red-600",
  },

  session: {
    icon: CalendarClock,
    background: "bg-violet-100",
    iconColor: "text-violet-700",
  },

  reminder: {
    icon: Clock3,
    background: "bg-amber-100",
    iconColor: "text-amber-600",
  },
};

const NotificationItem = ({
  type,
  title,
  time,
  unread = false,
  isLast = false,
}: NotificationItemProps) => {
  const config = notificationConfig[type];

  const Icon = config.icon;

  return (
    <div
      className={`cursor-pointer flex items-center gap-5 px-7 py-5 transition-colors duration-200 hover:bg-violet-50/60 ${
        !isLast ? "border-b border-slate-100" : ""
      }`}
    >
      {/* Notification Icon */}
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${config.background}`}
      >
        <Icon
          size={22}
          strokeWidth={2}
          className={config.iconColor}
        />
      </div>

      {/* Notification Content */}
      <div className="min-w-0 flex-1">
        <p className="text-lg font-medium leading-snug text-[#211653]">
          {title}
        </p>

        <p className="mt-1 text-base text-slate-500">
          {time}
        </p>
      </div>

      {/* Unread Indicator */}
      {unread && (
        <span
          className="h-3 w-3 shrink-0 rounded-full bg-violet-600"
          aria-label="Unread notification"
        />
      )}
    </div>
  );
};

export default NotificationItem;