import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import NotificationsHeader from "./NotificationsHeader";
import NotificationFilters from "./NotificationFilters";
import NotificationGroup from "./NotificationGroup";

const NotificationsLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f7fc]">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Topbar />

          <div className="mx-auto mt-8 max-w-5xl">
            <NotificationsHeader />

            <div className="mt-6">
              <NotificationFilters />
            </div>

            <div className="mt-7">
              <NotificationGroup
                title="TODAY"
                notifications={[
                  {
                    type: "request",
                    title:
                      "Sneha Rao requested a DSA doubt session",
                    time: "10 minutes ago",
                    unread: true,
                  },
                  {
                    type: "review",
                    title:
                      "Priya Sharma left you a 5-star review",
                    time: "1 hour ago",
                    unread: true,
                  },
                  {
                    type: "credit",
                    title:
                      "You earned +10 credits for teaching React basics",
                    time: "2 hours ago",
                    unread: false,
                  },
                  {
                    type: "chat",
                    title:
                      "New message from Arjun Mehta",
                    time: "3 hours ago",
                    unread: false,
                  },
                ]}
              />
            </div>

            <div className="mt-8">
              <NotificationGroup
                title="EARLIER"
                notifications={[
                  {
                    type: "rejected",
                    title:
                      'Your session request for "Cloud Computing" was rejected',
                    time: "Yesterday, 6:40 PM",
                    unread: false,
                  },
                  {
                    type: "session",
                    title:
                      "Priya Sharma suggested a new time for React basics",
                    time: "Yesterday, 2:15 PM",
                    unread: false,
                  },
                  {
                    type: "reminder",
                    title:
                      "Reminder: UI/UX fundamentals session starts in 1 hour",
                    time: "2 days ago",
                    unread: false,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsLayout;