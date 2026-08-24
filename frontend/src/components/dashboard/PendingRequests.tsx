import { useState, useMemo } from "react";
import { Check, X, ArrowRight, Clock3, Inbox, Send, CalendarClock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import type { Session } from "@/data/sessions";
import AcceptRequestModal from "../mentor-requests/AcceptRequestModal";
import RejectRequestModal from "../mentor-requests/RejectRequestModal";
import { isInitialRequestExpired, isRescheduleRequestExpired } from "@/utils/sessionTime";

const PendingRequests = () => {
  const navigate = useNavigate();
  const {
    sessions,
    acceptRequest,
    rejectRequest,
    currentUser,
    rescheduleRequests,
    acceptRescheduleRequest,
    rejectRescheduleRequest,
  } = useSessions();
  const [acceptingSession, setAcceptingSession] = useState<Session | null>(null);
  const [rejectingSession, setRejectingSession] = useState<Session | null>(null);

  // Incoming active pending initial session requests
  const incomingInitialRequests = useMemo(
    () =>
      sessions.filter(
        (s) =>
          s.mentorId === currentUser.id &&
          s.status === "pending" &&
          !isInitialRequestExpired(s)
      ),
    [sessions, currentUser.id]
  );

  // Incoming active pending reschedule requests
  const incomingRescheduleRequests = useMemo(
    () =>
      rescheduleRequests.filter(
        (r) =>
          r.requestedForId === currentUser.id &&
          r.status === "pending" &&
          !isRescheduleRequestExpired(r)
      ),
    [rescheduleRequests, currentUser.id]
  );

  // Outgoing active pending initial session requests
  const outgoingInitialRequests = useMemo(
    () =>
      sessions.filter(
        (s) =>
          s.learnerId === currentUser.id &&
          s.status === "pending" &&
          !isInitialRequestExpired(s)
      ),
    [sessions, currentUser.id]
  );

  // Outgoing active pending reschedule requests
  const outgoingRescheduleRequests = useMemo(
    () =>
      rescheduleRequests.filter(
        (r) =>
          r.requestedById === currentUser.id &&
          r.status === "pending" &&
          !isRescheduleRequestExpired(r)
      ),
    [rescheduleRequests, currentUser.id]
  );

  const totalIncomingCount =
    incomingInitialRequests.length + incomingRescheduleRequests.length;
  const totalPendingCount =
    totalIncomingCount +
    outgoingInitialRequests.length +
    outgoingRescheduleRequests.length;

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
            Pending Requests
          </h2>
          {totalPendingCount > 0 && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
              {totalPendingCount}
            </span>
          )}
        </div>

        {totalIncomingCount > 0 ? (
          <Link
            to={incomingInitialRequests.length > 0 ? "/mentor-requests" : "/my-sessions"}
            className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
          >
            View Requests <ArrowRight size={14} />
          </Link>
        ) : (
          <Link
            to="/my-sessions"
            className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
          >
            View All <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {/* Summary message if incoming requests exist */}
      {totalIncomingCount > 0 && (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-amber-50/80 px-3.5 py-2 border border-amber-100">
          <p className="text-xs font-semibold text-amber-900">
            {totalIncomingCount} {totalIncomingCount === 1 ? "request" : "requests"} waiting for your response
          </p>
          <button
            type="button"
            onClick={() => navigate(incomingInitialRequests.length > 0 ? "/mentor-requests" : "/my-sessions")}
            className="cursor-pointer text-xs font-bold text-amber-800 underline hover:text-amber-950"
          >
            View Requests
          </button>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {totalPendingCount === 0 ? (
          <div className="rounded-2xl bg-slate-50/80 p-6 text-center">
            <Inbox className="mx-auto text-slate-400" size={24} />
            <p className="mt-2 text-xs font-semibold text-slate-600">
              No pending requests
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              When peers request mentoring or you send proposals, they will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Incoming Initial Requests */}
            {incomingInitialRequests.length > 0 && (
              <div className="space-y-2">
                {incomingInitialRequests.slice(0, 3).map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between rounded-2xl border border-amber-100 bg-amber-50/20 p-3.5 transition hover:border-violet-200 hover:bg-violet-50/40"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                          Incoming
                        </span>
                        <Link
                          to={`/session-details/${request.id}`}
                          className="font-semibold text-slate-900 hover:text-violet-700 block truncate text-xs sm:text-sm"
                        >
                          {request.topic}
                        </Link>
                      </div>

                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
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
                ))}
              </div>
            )}

            {/* Incoming Reschedule Proposals */}
            {incomingRescheduleRequests.length > 0 && (
              <div className="space-y-2 pt-1">
                {incomingRescheduleRequests.slice(0, 3).map((resched) => (
                  <div
                    key={resched.id}
                    className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50/50 p-3.5 transition hover:border-amber-300"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 flex items-center gap-1">
                          <CalendarClock size={11} /> Reschedule
                        </span>
                        <Link
                          to={`/session-details/${resched.sessionId}`}
                          className="font-semibold text-slate-900 hover:text-violet-700 block truncate text-xs sm:text-sm"
                        >
                          {resched.topic}
                        </Link>
                      </div>

                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                        <span>Proposed: {resched.proposedDate} at {resched.proposedTime}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => acceptRescheduleRequest(resched.id)}
                        title="Accept reschedule"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700 shadow-xs"
                      >
                        <Check size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => rejectRescheduleRequest(resched.id)}
                        title="Decline reschedule"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-red-200 bg-white text-red-600 transition hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Outgoing Requests (Initial and Reschedule) */}
            {(outgoingInitialRequests.length > 0 || outgoingRescheduleRequests.length > 0) &&
              totalIncomingCount < 3 && (
                <div className="space-y-2 pt-1">
                  {totalIncomingCount > 0 && (
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Outgoing Requests
                    </p>
                  )}
                  {outgoingInitialRequests
                    .slice(0, 3 - totalIncomingCount)
                    .map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 transition hover:border-violet-200 hover:bg-violet-50/40"
                      >
                        <div className="min-w-0 pr-3">
                          <div className="flex items-center gap-1.5">
                            <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-700">
                              Outgoing
                            </span>
                            <Link
                              to={`/session-details/${request.id}`}
                              className="font-semibold text-slate-900 hover:text-violet-700 block truncate text-xs sm:text-sm"
                            >
                              {request.topic}
                            </Link>
                          </div>

                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <span>with {request.mentor}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock3 size={12} />
                              {request.date}
                            </span>
                          </p>
                        </div>

                        <div className="shrink-0 flex items-center gap-1 text-xs text-slate-500">
                          <Send size={12} className="text-violet-500" />
                          <span className="text-[11px] font-medium text-slate-600">
                            Awaiting Response
                          </span>
                        </div>
                      </div>
                    ))}

                  {outgoingRescheduleRequests
                    .slice(0, Math.max(0, 3 - totalIncomingCount - outgoingInitialRequests.length))
                    .map((resched) => (
                      <div
                        key={resched.id}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 transition hover:border-violet-200 hover:bg-violet-50/40"
                      >
                        <div className="min-w-0 pr-3">
                          <div className="flex items-center gap-1.5">
                            <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                              Reschedule Sent
                            </span>
                            <Link
                              to={`/session-details/${resched.sessionId}`}
                              className="font-semibold text-slate-900 hover:text-violet-700 block truncate text-xs sm:text-sm"
                            >
                              {resched.topic}
                            </Link>
                          </div>

                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <span>Proposed: {resched.proposedDate} at {resched.proposedTime}</span>
                          </p>
                        </div>

                        <div className="shrink-0 flex items-center gap-1 text-xs text-slate-500">
                          <Send size={12} className="text-amber-600" />
                          <span className="text-[11px] font-medium text-slate-600">
                            Awaiting Response
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
          </>
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