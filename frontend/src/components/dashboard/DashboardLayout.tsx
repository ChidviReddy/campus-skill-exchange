import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import WelcomeBanner from "./WelcomeBanner";
import ReviewReminderBanner from "./ReviewReminderBanner";
import StatsCards from "./StatsCards";
import UpcomingSessions from "./UpcomingSessions";
import RecentChats from "./RecentChats";
import PendingRequests from "./PendingRequests";
import NotificationsFeed from "./NotificationsFeed";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <Topbar />

        <WelcomeBanner />

        <ReviewReminderBanner />

        <StatsCards />

        <div className="mt-8 grid gap-6 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            <UpcomingSessions />
            <PendingRequests />
          </div>

          <div className="space-y-6">
            <NotificationsFeed />
            <RecentChats />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;