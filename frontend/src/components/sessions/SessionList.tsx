import { CalendarDays, Clock3, CheckCircle2, XCircle, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import type { Session, SessionFilter } from "@/data/sessions";
import { getSessionStartDateTime } from "@/utils/sessionTime";
import SessionCard from "./SessionCard";

type SessionListProps = {
  activeFilter?: SessionFilter;
};

// Helper: parse date to timestamp for sorting
const getSessionTimestamp = (session: Session): number => {
  const dt = getSessionStartDateTime(session.date, session.time);
  return dt ? dt.getTime() : 0;
};

const SessionList = ({ activeFilter = "all" }: SessionListProps) => {
  const navigate = useNavigate();
  const { sessions, currentUser } = useSessions();

  const userSessions = sessions.filter((session) => {
    if (session.bookedAgain) return false;
    // For pending requests: show outgoing learner requests under My Sessions
    if (session.status === "pending") {
      return session.learnerId === currentUser.id;
    }
    // For upcoming, completed, cancelled, rejected: show if current user is learner or mentor
    return (
      session.learnerId === currentUser.id ||
      session.mentorId === currentUser.id
    );
  });

  // Filter sessions according to active tab
  let filtered = userSessions;
  if (activeFilter === "upcoming") {
    filtered = userSessions.filter(
      (s) => s.status === "upcoming" || s.isStarted
    );
  } else if (activeFilter === "pending") {
    filtered = userSessions.filter((s) => s.status === "pending");
  } else if (activeFilter === "completed") {
    filtered = userSessions.filter((s) => s.status === "completed");
  } else if (activeFilter === "cancelled") {
    filtered = userSessions.filter(
      (s) => s.status === "cancelled" || s.status === "rejected"
    );
  }

  // Sort sessions based on context
  const sortedSessions = [...filtered].sort((a, b) => {
    if (activeFilter === "upcoming") {
      // In-progress sessions first, then nearest future sessions
      if (a.isStarted && !b.isStarted) return -1;
      if (!a.isStarted && b.isStarted) return 1;
      return getSessionTimestamp(a) - getSessionTimestamp(b);
    }

    if (activeFilter === "pending") {
      // Newest requests first (by id descending)
      return parseInt(b.id, 10) - parseInt(a.id, 10);
    }

    if (activeFilter === "completed") {
      // Most recent completions first
      return getSessionTimestamp(b) - getSessionTimestamp(a);
    }

    if (activeFilter === "cancelled") {
      // Most recent cancellations first
      return getSessionTimestamp(b) - getSessionTimestamp(a);
    }

    // Default "all" tab sorting: In Progress -> Upcoming -> Pending -> Completed -> Cancelled
    const priority: Record<string, number> = {
      in_progress: 1,
      upcoming: 2,
      pending: 3,
      completed: 4,
      cancelled: 5,
      rejected: 6,
    };

    const getStatusPriority = (s: Session) => {
      if (s.isStarted) return 1;
      return priority[s.status] || 99;
    };

    const priorityDiff = getStatusPriority(a) - getStatusPriority(b);
    if (priorityDiff !== 0) return priorityDiff;
    return getSessionTimestamp(b) - getSessionTimestamp(a);
  });

  if (sortedSessions.length === 0) {
    let emptyIcon = <CalendarDays size={36} className="text-violet-600" />;
    let emptyTitle = "No sessions found";
    let emptyDesc = "You don't have any sessions matching the selected filter.";
    let actionLabel = "Explore Mentors";
    let actionRoute = "/explore";

    if (activeFilter === "upcoming") {
      emptyIcon = <Clock3 size={36} className="text-violet-600" />;
      emptyTitle = "No upcoming sessions";
      emptyDesc = "You have no upcoming mentorship sessions scheduled at the moment.";
    } else if (activeFilter === "pending") {
      emptyIcon = <Inbox size={36} className="text-amber-600" />;
      emptyTitle = "No pending requests";
      emptyDesc = "You don't have any outgoing mentorship session requests waiting for acceptance.";
    } else if (activeFilter === "completed") {
      emptyIcon = <CheckCircle2 size={36} className="text-blue-600" />;
      emptyTitle = "No completed sessions";
      emptyDesc = "Sessions will appear here once they are finished by the mentor.";
    } else if (activeFilter === "cancelled") {
      emptyIcon = <XCircle size={36} className="text-red-500" />;
      emptyTitle = "No cancelled sessions";
      emptyDesc = "You do not have any cancelled or declined session requests.";
    }

    return (
      <div className="rounded-3xl border border-violet-100 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50">
          {emptyIcon}
        </div>

        <h3 className="mt-5 text-xl font-bold text-[#211653]">
          {emptyTitle}
        </h3>

        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          {emptyDesc}
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate(actionRoute)}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {sortedSessions.map((session) => (
        <SessionCard
          key={session.id}
          {...session}
        />
      ))}
    </section>
  );
};

export default SessionList;