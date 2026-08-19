import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import SessionDetailsHeader from "./SessionDetailsHeader";
import MentorInfoCard from "./MentorInfoCard";
import SessionInfoCard from "./SessionInfoCard";
import SessionTopicCard from "./SessionTopicCard";
import SessionActions from "./SessionActions";

type SessionDetailsLayoutProps = {
  session: Session | undefined;
};

const SessionDetailsLayout = ({ session }: SessionDetailsLayoutProps) => {
  const navigate = useNavigate();

  if (!session) {
    return (
      <div className="flex min-h-screen bg-[#f8f7fc]">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            <Topbar />

            <div className="mx-auto mt-16 max-w-lg text-center">
              <div className="rounded-3xl border border-violet-100 bg-white p-10 shadow-sm">
                <h2 className="text-2xl font-bold text-[#211653]">
                  Session not found
                </h2>
                <p className="mt-3 text-slate-500">
                  The session you are looking for does not exist or may have been removed.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate("/my-sessions")}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
                  >
                    <ArrowLeft size={18} />
                    Back to My Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f7fc]">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Topbar />

          <div className="mx-auto mt-8 max-w-6xl">
            <SessionDetailsHeader session={session} />

            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              <MentorInfoCard session={session} />

              <SessionInfoCard session={session} />
            </div>

            <div className="mt-6">
              <SessionTopicCard session={session} />
            </div>

            <div className="mt-6">
              <SessionActions session={session} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionDetailsLayout;