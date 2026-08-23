import { useState, useMemo } from "react";
import { Check, X, ArrowRight, Clock3, Inbox } from "lucide-react";
import { Link } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import type { Session } from "@/data/sessions";
import AcceptRequestModal from "../mentor-requests/AcceptRequestModal";
import RejectRequestModal from "../mentor-requests/RejectRequestModal";

import { isInitialRequestExpired } from "@/utils/sessionTime";

const PendingRequests = () => {
  const { sessions, acceptRequest, rejectRequest, currentUser } = useSessions();
  const [acceptingSession, setAcceptingSession] = useState<Session | null>(null);
  const [rejectingSession, setRejectingSession] = useState<Session | null>(null);

  const pendingRequests = useMemo(
    () =>
      sessions.filter(
        (s) =>
          s.mentorId === currentUser.id &&
          s.status === "pending" &&
          !isInitialRequestExpired(s)
      ),
    [sessions, currentUser.id]
  );

  const handleConfirmAccept = () => {
    if (acceptingSession) {
      acceptRequest(acceptingSession.id);
      setAcceptingSession(null);
    }
  };

  const handleConfirmReject = () => {
    if (rejectingSession) {
      rejectRequest(rejectingSession.id);
      setRejectingSession(null);
    }
  };

  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-slate-800">
            Pending Mentor Requests
          </h2>
          {pendingRequests.length > 0 && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
              {pendingRequests.length}
            </span>
          )}
        </div>

        <Link
          to="/mentor-requests"
          className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {pendingRequests.length > 0 ? (
          pendingRequests.slice(0, 3).map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 p-3.5 transition hover:border-violet-200 hover:bg-violet-50/40"
            >
              <div className="min-w-0 pr-3">
                <Link
                  to={`/session-details/${request.id}`}
                  className="font-semibold text-slate-900 hover:text-violet-700 block truncate"
                >
                  {request.topic}
                </Link>

                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <span>{request.learnerName || "Student Learner"}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock3 size={12} />
                    {request.date}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setAcceptingSession(request)}
                  title="Accept request"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition hover:bg-emerald-200"
                >
                  <Check size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setRejectingSession(request)}
                  title="Decline request"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-200"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-slate-50/80 p-6 text-center">
            <Inbox className="mx-auto text-slate-400" size={24} />
            <p className="mt-2 text-xs font-semibold text-slate-600">
              No pending session requests
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              When students request mentoring, they will appear here.
            </p>
          </div>
        )}
      </div>

      <AcceptRequestModal
        isOpen={Boolean(acceptingSession)}
        session={acceptingSession}
        onClose={() => setAcceptingSession(null)}
        onConfirm={handleConfirmAccept}
      />

      <RejectRequestModal
        isOpen={Boolean(rejectingSession)}
        session={rejectingSession}
        onClose={() => setRejectingSession(null)}
        onConfirm={handleConfirmReject}
      />
    </div>
  );
};

export default PendingRequests;