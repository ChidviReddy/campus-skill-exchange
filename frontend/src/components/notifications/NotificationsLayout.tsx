import { Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import NotificationsHeader from "./NotificationsHeader";
import NotificationFilters from "./NotificationFilters";
import NotificationGroup from "./NotificationGroup";

const NotificationsLayout = () => {
  const { filteredNotifications, activeFilter } = useNotifications();

  const todayNotifications = filteredNotifications.filter(
    (n) => n.group === "today"
  );
  const earlierNotifications = filteredNotifications.filter(
    (n) => n.group === "earlier" || !n.group
  );

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

            {filteredNotifications.length === 0 ? (
              <div className="mx-auto mt-12 max-w-md text-center">
                <div className="rounded-3xl border border-violet-100 bg-white p-10 shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                    <Bell size={28} />
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#211653]">
                    {activeFilter === "unread"
                      ? "No unread notifications"
                      : "No notifications found"}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {activeFilter === "unread"
                      ? "You're all caught up! Check back later for new updates."
                      : "There are no notifications matching the selected filter."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-7 space-y-7">
                <NotificationGroup
                  title="TODAY"
                  notifications={todayNotifications}
                />

                <NotificationGroup
                  title="EARLIER"
                  notifications={earlierNotifications}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsLayout;