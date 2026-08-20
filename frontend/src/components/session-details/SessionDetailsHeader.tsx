import { ArrowLeft, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";

type SessionDetailsHeaderProps = {
  session: Session;
};

const statusStyles: Record<
  "upcoming" | "pending" | "completed" | "cancelled" | "rejected",
  { badge: string; text: string; description: string }
> = {
  upcoming: {
    badge: "bg-green-100 text-green-700",
    text: "Upcoming",
    description: "Your upcoming mentorship session with",
  },
  pending: {
    badge: "bg-amber-100 text-amber-700",
    text: "Pending",
    description: "Your pending mentorship session request with",
  },
  completed: {
    badge: "bg-blue-100 text-blue-700",
    text: "Completed",
    description: "Your completed mentorship session with",
  },
  cancelled: {
    badge: "bg-red-100 text-red-700",
    text: "Cancelled",
    description: "Your cancelled mentorship session with",
  },
  rejected: {
    badge: "bg-red-100 text-red-700",
    text: "Declined",
    description: "Your declined mentorship session request with",
  },
};

const SessionDetailsHeader = ({ session }: SessionDetailsHeaderProps) => {
  const navigate = useNavigate();
  const currentStatus = statusStyles[session.status];

  return (
    <section>
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/my-sessions")}
        className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
      >
        <ArrowLeft size={18} />
        Back to My Sessions
      </button>

      {/* Heading */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-[#211653]">
              {session.topic}
            </h1>

            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${currentStatus.badge}`}>
              {currentStatus.text}
            </span>
          </div>

          <p className="mt-2 text-base text-slate-500">
            {currentStatus.description} {session.mentor}.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock3 size={18} className="text-violet-600" />
          <span>{session.duration} session</span>
        </div>
      </div>
    </section>
  );
};

export default SessionDetailsHeader;