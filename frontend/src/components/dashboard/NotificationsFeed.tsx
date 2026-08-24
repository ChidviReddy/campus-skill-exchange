import {
  Star,
  Coins,
  CalendarClock,
  MessageCircle,
  Bell,
  ArrowRight,
  Sparkles,
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
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
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
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
  },
};

const NotificationsFeed = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead } = useNotifications();

  // Top 5 recent activities for currentUser
  const feedList = notifications.slice(0, 5);

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
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-slate-800">
            Recent Activity
          </h2>
          {unreadCount > 0 && (
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-bold text-violet-700">
              {unreadCount} unread
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate("/notifications")}
          className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
        >
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="mt-5 space-y-2.5">
        {feedList.length === 0 ? (
          <div className="rounded-2xl bg-slate-50/80 p-6 text-center">
            <Sparkles className="mx-auto text-slate-400" size={24} />
            <p className="mt-2 text-xs font-semibold text-slate-600">
              No recent activity
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Your updates and peer interactions will show up here.
            </p>
          </div>
        ) : (
          feedList.map((notification) => {
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
                className={`flex w-full cursor-pointer items-start gap-3.5 rounded-2xl p-3 text-left transition hover:bg-violet-50/60 ${
                  !notification.isRead
                    ? "bg-violet-50/30 border border-violet-100/80"
                    : "border border-transparent"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.iconBg}`}
                >
                  <Icon size={18} className={config.iconColor} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1">
                      {notification.title}
                    </p>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {notification.timestamp}
                    </span>
                  </div>

                  <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                    {notification.message}
                  </p>
                </div>

                {!notification.isRead && (
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-600" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsFeed;