import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle, ShieldAlert } from "lucide-react";
import { useSessions } from "@/hooks/useSessions";
import { getSessionNotes } from "@/data/sessionNotes";
import SessionNotesLayout from "@/components/session-notes/SessionNotesLayout";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

const SessionNotes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSessionById, currentUser } = useSessions();
  const session = getSessionById(id);

  // 1. Session not found
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

  // 2. Non-participant check
  const isParticipant =
    currentUser.id === session.learnerId || currentUser.id === session.mentorId;

  if (!isParticipant) {
    return (
      <div className="flex min-h-screen bg-[#f8f7fc]">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            <Topbar />

            <div className="mx-auto mt-16 max-w-lg text-center">
              <div className="rounded-3xl border border-red-100 bg-white p-10 shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <ShieldAlert size={36} />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-[#211653]">
                  Access Denied
                </h2>
                <p className="mt-3 text-sm text-slate-500">
                  You are not a participant in this session. Only the assigned learner and mentor can view session notes.
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

  // 2. Non-completed session check
  if (session.status !== "completed") {
    return (
      <div className="flex min-h-screen bg-[#f8f7fc]">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            <Topbar />

            <div className="mx-auto mt-16 max-w-lg text-center">
              <div className="rounded-3xl border border-amber-100 bg-white p-10 shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <AlertCircle size={32} />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-[#211653]">
                  Session notes are available only for completed sessions.
                </h2>

                <p className="mt-3 text-slate-500">
                  This session on <span className="font-semibold text-slate-700">{session.topic}</span> is currently marked as{" "}
                  <span className="font-semibold capitalize text-slate-700">{session.status}</span>.
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

  // 3. Completed session -> render notes layout
  const notes = getSessionNotes(session);
  return <SessionNotesLayout session={session} notes={notes} />;
};

export default SessionNotes;
