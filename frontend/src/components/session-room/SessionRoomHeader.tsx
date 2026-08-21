import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";

import { useSessions } from "@/hooks/useSessions";

type SessionRoomHeaderProps = {
  session: Session;
};

const statusStyles: Record<
  "upcoming" | "pending" | "completed" | "cancelled" | "rejected",
  { badge: string; text: string }
> = {
  upcoming: {
    badge: "bg-green-100 text-green-700",
    text: "Upcoming",
  },
  pending: {
    badge: "bg-amber-100 text-amber-700",
    text: "Pending",
  },
  completed: {
    badge: "bg-blue-100 text-blue-700",
    text: "Completed",
  },
  cancelled: {
    badge: "bg-red-100 text-red-700",
    text: "Cancelled",
  },
  rejected: {
    badge: "bg-red-100 text-red-700",
    text: "Declined",
  },
};

const SessionRoomHeader = ({ session }: SessionRoomHeaderProps) => {
  const navigate = useNavigate();
  const { currentUser } = useSessions();
  const isMentor = currentUser.id === session.mentorId;
  const isStarted = !!session.isStarted;

  let badgeClass = statusStyles[session.status]?.badge || "bg-violet-100 text-violet-700";
  let badgeText = statusStyles[session.status]?.text || session.status;

  if (session.status === "upcoming") {
    if (isStarted) {
      badgeClass = "bg-emerald-100 text-emerald-700 border border-emerald-200 animate-pulse";
      badgeText = "● Live Session In Progress";
    } else {
      badgeClass = isMentor ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-violet-100 text-violet-700 border border-violet-200";
      badgeText = isMentor ? "Ready to Start" : "Waiting Room";
    }
  }

  return (
    <section>
      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(`/session-details/${session.id}`)}
            className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
          >
            <ArrowLeft size={18} />
            Back to Session Details
          </button>

          <span className="text-slate-300">|</span>

          <button
            type="button"
            onClick={() => navigate("/my-sessions")}
            className="cursor-pointer text-sm font-medium text-slate-500 transition hover:text-violet-700"
          >
            Back to My Sessions
          </button>
        </div>
      </div>

      {/* Heading */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-[#211653]">
              {session.topic}
            </h1>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
            >
              {badgeText}
            </span>
          </div>

          <p className="mt-2 text-base text-slate-500">
            Mentor: <span className="font-medium text-slate-700">{session.mentor}</span> ({session.mentorRole}) · Learner: <span className="font-medium text-slate-700">{session.learnerName || "Student"}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <CalendarDays size={16} className="text-violet-600" />
            <span>{session.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock3 size={16} className="text-violet-600" />
            <span>{session.time}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionRoomHeader;
