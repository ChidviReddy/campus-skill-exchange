import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";

type SessionRoomHeaderProps = {
  session: Session;
};

const statusStyles = {
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
};

const SessionRoomHeader = ({ session }: SessionRoomHeaderProps) => {
  const navigate = useNavigate();
  const currentStatus = statusStyles[session.status];

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
              className={`rounded-full px-3 py-1 text-xs font-semibold ${currentStatus.badge}`}
            >
              {currentStatus.text}
            </span>
          </div>

          <p className="mt-2 text-base text-slate-500">
            Mentor: <span className="font-medium text-slate-700">{session.mentor}</span> ({session.mentorRole})
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
