import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useSessions } from "@/hooks/useSessions";
import RequestLayout from "@/components/request/RequestLayout";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

const BookAgain = () => {
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

  // 2. Non-learner check: only the learner of the cancelled session can rebook
  if (session.learnerId !== currentUser.id) {
    return (
      <div className="flex min-h-screen bg-[#f8f7fc]">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            <Topbar />

            <div className="mx-auto mt-16 max-w-lg text-center">
              <div className="rounded-3xl border border-red-100 bg-white p-10 shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <AlertCircle size={32} />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-[#211653]">
                  Access Denied
                </h2>

                <p className="mt-3 text-slate-500 text-sm">
                  Only the assigned learner of this cancelled session can re-book.
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

  // 3. Non-cancelled session
  if (session.status !== "cancelled") {
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
                  Book Again is available only for cancelled sessions.
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

  // 4. Already booked again check (prevent duplicate requests)
  if (session.bookedAgain) {
    return (
      <div className="flex min-h-screen bg-[#f8f7fc]">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            <Topbar />

            <div className="mx-auto mt-16 max-w-lg text-center">
              <div className="rounded-3xl border border-violet-100 bg-white p-10 shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                  <AlertCircle size={32} />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-[#211653]">
                  Request Already Created
                </h2>

                <p className="mt-3 text-slate-500">
                  You have already created a new booking request for this session on{" "}
                  <span className="font-semibold text-slate-700">{session.topic}</span>.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {session.replacedBySessionId && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/session-details/${session.replacedBySessionId}`)
                      }
                      className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
                    >
                      View Pending Request
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate("/my-sessions")}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
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

  // 5. Valid cancelled session -> render RequestLayout with prefilled values
  return <RequestLayout sourceSession={session} isBookAgain={true} />;
};

export default BookAgain;
