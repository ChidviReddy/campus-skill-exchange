import type { Notification } from "@/data/notifications";
import NotificationItem from "./NotificationItem";

type NotificationGroupProps = {
  title: string;
  notifications: Notification[];
};

const NotificationGroup = ({
  title,
  notifications,
}: NotificationGroupProps) => {
  if (notifications.length === 0) return null;

  return (
    <section>
      {/* Group Heading */}
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </h2>

      {/* Notification Container */}
      <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            isLast={index === notifications.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default NotificationGroup;