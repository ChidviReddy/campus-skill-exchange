import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import SessionInfo from "./SessionInfo";
import TopicInput from "./TopicInput";
import GoalTextarea from "./GoalTextarea";
import ScheduleCard from "./ScheduleCard";
import CreditsCard from "./CreditsCard";
import SubmitRequest from "./SubmitRequest";

const RequestLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <Topbar />

        <div className="mt-8 grid gap-8 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <SessionInfo />

            <TopicInput />

            <GoalTextarea />

            <ScheduleCard />
          </div>

          <div>
            <CreditsCard />

            <div className="mt-6">
              <SubmitRequest />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RequestLayout;