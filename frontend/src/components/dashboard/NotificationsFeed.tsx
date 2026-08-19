import {
  Star,
  Coins,
  CalendarClock,
  MessageCircle,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import type { NotificationType } from "@/data/notifications";

const iconConfig: Record<
  NotificationType,
  {
    icon: typeof Bell;
    iconBg: string;
    iconColor: string;
  }
> = {
  session: {
    icon: CalendarClock,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
  },
  message: {
    icon: MessageCircle,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
  },
  review: {
    icon: Star,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  credit: {
    icon: Coins,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  system: {
    icon: Bell,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
  },
};

const NotificationsFeed = () => {
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();

  const feedList = notifications.slice(0, 2);

  const handleNotificationClick = (id: string, relatedRoute?: string) => {
    markAsRead(id);
    if (relatedRoute) {
      navigate(relatedRoute);
    } else {
      navigate("/notifications");
    }
  };

  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Notifications
        </h2>

        <button
          type="button"
          onClick={() => navigate("/notifications")}
          className="text-sm cursor-pointer font-semibold text-violet-600 hover:text-violet-700"
        >
          View All
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {feedList.map((notification) => {
          const config =
            iconConfig[notification.type] || iconConfig.system;
          const Icon = config.icon;

          return (
            <button
              key={notification.id}
              type="button"
              onClick={() =>
                handleNotificationClick(
                  notification.id,
                  notification.relatedRoute
                )
              }
              className="flex w-full cursor-pointer items-start gap-4 rounded-xl p-2 text-left transition hover:bg-violet-50"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.iconBg}`}
              >
                <Icon size={18} className={config.iconColor} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug font-medium text-slate-800">
                  {notification.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {notification.message}
                </p>
              </div>

              {!notification.isRead && (
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsFeed;