import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import NotificationsHeader from "./NotificationsHeader";
import NotificationFilters from "./NotificationFilters";
import NotificationList from "./NotificationList";

const NotificationsLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <Topbar />

        <div className="mx-auto mt-8 max-w-7xl">
          <NotificationsHeader />

          <div className="mt-8">
            <NotificationFilters />
          </div>

          <div className="mt-8">
            <NotificationList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsLayout;