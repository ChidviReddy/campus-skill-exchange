import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import SessionDetailsHeader from "./SessionDetailsHeader";
import MentorInfoCard from "./MentorInfoCard";
import SessionInfoCard from "./SessionInfoCard";
import SessionTopicCard from "./SessionTopicCard";
import SessionActions from "./SessionActions";

const SessionDetailsLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f7fc]">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Topbar />

          <div className="mx-auto mt-8 max-w-6xl">
            <SessionDetailsHeader />

            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              <MentorInfoCard />

              <SessionInfoCard />
            </div>

            <div className="mt-6">
              <SessionTopicCard />
            </div>

            <div className="mt-6">
              <SessionActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionDetailsLayout;