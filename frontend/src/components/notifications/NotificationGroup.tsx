import NotificationItem from "./NotificationItem";

type NotificationType =
  | "request"
  | "review"
  | "credit"
  | "chat"
  | "rejected"
  | "session"
  | "reminder";

type Notification = {
  type: NotificationType;
  title: string;
  time: string;
  unread?: boolean;
};

type NotificationGroupProps = {
  title: string;
  notifications: Notification[];
};

const NotificationGroup = ({
  title,
  notifications,
}: NotificationGroupProps) => {
  return (
    <section>
      {/* Group Heading */}
      <h2 className="mb-3 text-lg font-medium text-slate-500">
        {title}
      </h2>

      {/* Notification Container */}
      <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={`${notification.title}-${index}`}
            type={notification.type}
            title={notification.title}
            time={notification.time}
            unread={notification.unread}
            isLast={index === notifications.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default NotificationGroup;