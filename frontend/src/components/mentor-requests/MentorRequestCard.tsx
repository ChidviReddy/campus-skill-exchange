import {
  CalendarDays,
  Clock3,
  Timer,
  Coins,
  BookOpen,
  User,
  Check,
  X,
  Eye,
  Video,
  CalendarClock,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";
import { isSessionBeforeStart, formatStartTimeOnly } from "@/utils/sessionTime";

type MentorRequestCardProps = {
  session: Session;
  onAccept: (session: Session) => void;
  onReject: (session: Session) => void;
};

const statusBadgeConfig: Record<
  "upcoming" | "pending" | "completed" | "cancelled" | "rejected",
  { bg: string; text: string; label: string }
> = {
  pending: {
    bg: "bg-amber-100 text-amber-800",
    text: "text-amber-800",
    label: "Pending Request",
  },
  upcoming: {
    bg: "bg-emerald-100 text-emerald-800",
    text: "text-emerald-800",
    label: "Upcoming Session",
  },
  completed: {
    bg: "bg-blue-100 text-blue-800",
    text: "text-blue-800",
    label: "Completed Session",
  },
  cancelled: {
    bg: "bg-red-100 text-red-700",
    text: "text-red-700",
    label: "Cancelled",
  },
  rejected: {
    bg: "bg-slate-100 text-slate-700",
    text: "text-slate-700",
    label: "Declined",
  },
};

const MentorRequestCard = ({
  session,
  onAccept,
  onReject,
}: MentorRequestCardProps) => {
  const navigate = useNavigate();
  const learnerName = session.learnerName || "Student Learner";
  const initials = learnerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const badgeConfig =
    statusBadgeConfig[session.status] || statusBadgeConfig.pending;

  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-violet-300 hover:shadow-md">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Learner & Session Info */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-base font-bold text-violet-700">
              {initials}
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold text-slate-900">
                  {learnerName}
                </h3>
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-bold ${badgeConfig.bg}`}
                >
                  {badgeConfig.label}
                </span>
              </div>

              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <User size={13} />
                Student • Peer Mentorship
              </p>
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-base font-semibold text-slate-800">
              <BookOpen size={16} className="text-violet-600" />
              {session.topic}
            </h4>

            {session.learnerGoal && (
              <p className="mt-1.5 line-clamp-2 max-w-xl text-xs leading-relaxed text-slate-600 italic bg-violet-50/50 rounded-xl p-2.5 border border-violet-100">
                "{session.learnerGoal}"
              </p>
            )}
          </div>

          {/* Schedule Details Grid */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 border border-slate-100">
              <CalendarDays size={14} className="text-violet-600" />
              {session.date}
            </span>

            <span className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 border border-slate-100">
              <Clock3 size={14} className="text-violet-600" />
              {session.time}
            </span>

            <span className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 border border-slate-100">
              <Timer size={14} className="text-violet-600" />
              {session.duration}
            </span>

            <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-emerald-700 border border-emerald-100 font-semibold">
              <Coins size={14} className="text-emerald-600" />
              +10 Credits at completion
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0">
          {session.status === "pending" && (
            <>
              <Link
                to={`/session-details/${session.id}`}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-xs font-semibold text-violet-700 shadow-xs transition hover:bg-violet-50 hover:border-violet-300"
              >
                <Eye size={15} />
                View Request
              </Link>

              <button
                type="button"
                onClick={() => onReject(session)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 shadow-xs transition hover:bg-red-50 hover:border-red-300"
              >
                <X size={15} />
                Decline
              </button>

              <button
                type="button"
                onClick={() => onAccept(session)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-700"
              >
                <Check size={15} />
                Accept Request
              </button>
            </>
          )}

          {session.status === "upcoming" && (
            <>
              {isSessionBeforeStart(session.date, session.time) ? (
                <button
                  type="button"
                  onClick={() => navigate(`/session-room/${session.id}`)}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-violet-100 px-4 py-2.5 text-xs font-semibold text-violet-700 shadow-xs transition hover:bg-violet-200"
                  title={`Session starts at ${formatStartTimeOnly(session.time)}`}
                >
                  <Video size={15} />
                  Starts at {formatStartTimeOnly(session.time)}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(`/session-room/${session.id}`)}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-violet-700 hover:shadow-md"
                >
                  <Video size={15} />
                  Join Session
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate(`/reschedule-session/${session.id}`)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-xs font-semibold text-violet-700 shadow-xs transition hover:bg-violet-50"
              >
                <CalendarClock size={15} />
                Reschedule
              </button>

              <Link
                to={`/session-details/${session.id}`}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
              >
                <Eye size={15} />
                Details
              </Link>
            </>
          )}

          {session.status === "completed" && (
            <>
              <button
                type="button"
                onClick={() => navigate(`/session-notes/${session.id}`)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
              >
                <FileText size={15} />
                View Notes
              </button>

              <Link
                to={`/session-details/${session.id}`}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
              >
                <Eye size={15} />
                Details
              </Link>
            </>
          )}

          {(session.status === "cancelled" || session.status === "rejected") && (
            <Link
              to={`/session-details/${session.id}`}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
            >
              <Eye size={15} />
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorRequestCard;
