import {
  Star,
  Coins,
  CalendarClock,
  UserPlus,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: Star,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    message: "You received a 5-star review from Priya S.",
  },
  {
    id: 2,
    icon: Coins,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    message: "+10 credits earned for teaching a session.",
  },
];

const NotificationsFeed = () => {
  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Notifications
        </h2>

        <button className="text-sm cursor-pointer font-medium text-violet-600 hover:text-violet-700">
          View All
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {notifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <button
              key={notification.id}
              className="flex w-full cursor-pointer items-start gap-4 rounded-xl p-2 text-left transition hover:bg-violet-50"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${notification.iconBg}`}
              >
                <Icon
                  size={18}
                  className={notification.iconColor}
                />
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {notification.message}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsFeed;