import {
  Bell,
  Star,
  Coins,
  MessageCircle,
  CalendarClock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import type { Notification, NotificationType } from "@/data/notifications";

type NotificationItemProps = {
  notification: Notification;
  isLast?: boolean;
};

const notificationConfig: Record<
  NotificationType,
  {
    icon: typeof Bell;
    background: string;
    iconColor: string;
  }
> = {
  session: {
    icon: CalendarClock,
    background: "bg-violet-100",
    iconColor: "text-violet-700",
  },
  message: {
    icon: MessageCircle,
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
  system: {
    icon: Bell,
    background: "bg-violet-100",
    iconColor: "text-violet-700",
  },
};

const NotificationItem = ({
  notification,
  isLast = false,
}: NotificationItemProps) => {
  const navigate = useNavigate();
  const { markAsRead } = useNotifications();

  const config =
    notificationConfig[notification.type] || notificationConfig.system;
  const Icon = config.icon;

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    if (notification.relatedRoute) {
      navigate(notification.relatedRoute);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer flex items-center gap-5 px-7 py-5 transition-colors duration-200 hover:bg-violet-50/60 ${
        !notification.isRead ? "bg-violet-50/30" : ""
      } ${!isLast ? "border-b border-slate-100" : ""}`}
    >
      {/* Notification Icon */}
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${config.background} shadow-xs`}
      >
        <Icon size={22} strokeWidth={2} className={config.iconColor} />
      </div>

      {/* Notification Content */}
      <div className="min-w-0 flex-1">
        <p
          className={`text-base leading-snug ${
            !notification.isRead
              ? "font-bold text-[#211653]"
              : "font-medium text-slate-800"
          }`}
        >
          {notification.title}
        </p>

        <p className="mt-0.5 text-sm text-slate-600">
          {notification.message}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {notification.timestamp}
        </p>
      </div>

      {/* Unread Indicator */}
      {!notification.isRead && (
        <span
          className="h-3 w-3 shrink-0 rounded-full bg-violet-600 shadow-xs"
          aria-label="Unread notification"
        />
      )}
    </div>
  );
};

export default NotificationItem;