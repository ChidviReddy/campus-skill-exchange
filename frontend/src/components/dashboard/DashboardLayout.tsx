import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import WelcomeBanner from "./WelcomeBanner";
import StatsCards from "./StatsCards";
import UpcomingSessions from "./UpcomingSessions";
import RecentChats from "./RecentChats";
import PendingRequests from "./PendingRequests";
import NotificationsFeed from "./NotificationsFeed";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <Topbar />

        <WelcomeBanner />

        <StatsCards />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <UpcomingSessions />
            <RecentChats />
            <PendingRequests />
            <NotificationsFeed />
            <div></div>
        </div>

        {/* Dashboard Widgets */}
      </main>
    </div>
  );
};

export default DashboardLayout;