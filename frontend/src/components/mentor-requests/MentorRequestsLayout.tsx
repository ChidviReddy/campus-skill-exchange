import { useState, useMemo } from "react";
import { Inbox, CheckCircle2, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import type { Session } from "@/data/sessions";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import MentorRequestCard from "./MentorRequestCard";
import AcceptRequestModal from "./AcceptRequestModal";
import RejectRequestModal from "./RejectRequestModal";

type FilterTab = "pending" | "upcoming" | "all";

const MentorRequestsLayout = () => {
  const { sessions, acceptRequest, rejectRequest, currentUser } = useSessions();
  const [activeTab, setActiveTab] = useState<FilterTab>("pending");
  const [acceptingSession, setAcceptingSession] = useState<Session | null>(null);
  const [rejectingSession, setRejectingSession] = useState<Session | null>(null);

  // Incoming requests sent to the current logged-in user
  const pendingRequests = useMemo(
    () =>
      sessions.filter(
        (s) => s.mentorId === currentUser.id && s.status === "pending" && !s.bookedAgain
      ),
    [sessions, currentUser.id]
  );

  // Upcoming sessions where current user is mentor OR learner
  const upcomingSessions = useMemo(
    () =>
      sessions.filter(
        (s) =>
          (s.mentorId === currentUser.id || s.learnerId === currentUser.id) &&
          s.status === "upcoming"
      ),
    [sessions, currentUser.id]
  );

  const displayedSessions = useMemo(() => {
    if (activeTab === "pending") return pendingRequests;
    if (activeTab === "upcoming") return upcomingSessions;
    return sessions.filter(
      (s) =>
        (s.mentorId === currentUser.id || s.learnerId === currentUser.id) &&
        !s.bookedAgain
    );
  }, [activeTab, pendingRequests, upcomingSessions, sessions, currentUser.id]);

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
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <Topbar />

        {/* Page Header */}
        <div className="mt-8 rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <Inbox size={28} />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">
                    Incoming Requests
                  </h1>
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                    {currentUser.name}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Review and manage incoming mentorship requests sent to you.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800 border border-emerald-100">
              <Sparkles size={16} className="text-emerald-600" />
              <span>Teaching Reward: +10 Credits per completed session</span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab("pending")}
              className={`cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === "pending"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              Pending Requests
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeTab === "pending"
                    ? "bg-violet-700 text-white"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {pendingRequests.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("upcoming")}
              className={`cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === "upcoming"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              Upcoming Sessions
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeTab === "upcoming"
                    ? "bg-violet-700 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {upcomingSessions.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === "all"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              All Sessions
            </button>
          </div>
        </div>

        {/* Requests List */}
        <section className="mt-8 space-y-4">
          {displayedSessions.length > 0 ? (
            displayedSessions.map((session) => (
              <MentorRequestCard
                key={session.id}
                session={session}
                onAccept={(s) => setAcceptingSession(s)}
                onReject={(s) => setRejectingSession(s)}
              />
            ))
          ) : (
            <div className="rounded-3xl border border-violet-100 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {activeTab === "pending"
                  ? "No Pending Requests"
                  : activeTab === "upcoming"
                  ? "No Upcoming Sessions"
                  : "No Sessions Found"}
              </h3>
              <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                {activeTab === "pending"
                  ? "You've answered all incoming session requests. New learning requests from students will appear here."
                  : "You don't have any upcoming mentoring sessions scheduled right now."}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  to="/my-sessions"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 shadow-xs"
                >
                  <Calendar size={16} />
                  View All Sessions
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Confirmation Modals */}
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

export default MentorRequestsLayout;
